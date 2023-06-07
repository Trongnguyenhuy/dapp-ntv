//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./RewardToken.sol";
import "./StakeToken.sol";

contract DynamicARPFarmingPool is Ownable, ERC20 {
    using SafeERC20 for StakeToken;

    RewardToken public rewardToken; // reward Token
    StakeToken public stakeToken; // stake Token

    uint256 private rewardTokensPerBlock; // reward tokens gotten per block
    uint256 private constant BIG_INT_FORMATTER = 1e6;
    uint256 private totalMultiplier;

    // Staker info
    struct StakerInfo {
        uint256 totalTokenStake;
        uint256 firstStakeTime;
        uint256 finalStakeTime;
    }

    // Each time that person staking
    struct StakingTimeInfo {
        uint256 amount; // amount of staked token
        uint256 startBlock; // the block that the staker start earn in
        uint256 depositStartTime; // The time that staker deposit
    }

    // Pool information
    struct Pool {
        StakeToken stakeToken; // Token to be staked
        uint256 tokensStaked; // Total number of tokens staked
        uint256 endStakeTime; // staking duration
        uint256 farmMultiplier; // farm point in system
    }

    // Array of pools
    Pool[] public pools;

    //Mapping poolId => staker address => StakerInfor
    mapping(uint256 => mapping(address => StakerInfo)) public stakerInfo;

    // Mapping poolId => staker address => time => StakingTimeInfo
    mapping(uint256 => mapping(address => mapping(uint256 => StakingTimeInfo)))
        public stakingTimeInfo;

    // Events
    event Deposit(
        address indexed user,
        uint256 indexed poolId,
        uint256 amount,
        uint256 time
    );

    event Withdraw(
        address indexed user,
        uint256 indexed poolId,
        uint256 amount,
        uint256 time
    );

    event CollectRewards(
        address indexed user,
        uint256 indexed poolId,
        uint256 amount,
        uint256 time
    );

event PoolCreated(uint256 indexed poolId);

    event ChangeFarmMultifier(uint256 indexed poolId, uint256 farmMultiplier);

    event UpdateRewardTokenPerBlock(uint256 _newReward);

    // Constructor
    constructor(address _rewardTokenAddress, uint256 _rewardTokensPerBlock)
        ERC20("Farming Pool Token", "FPTK")
    {
        rewardToken = RewardToken(_rewardTokenAddress);
        rewardTokensPerBlock = _rewardTokensPerBlock;
    }

    /**
     * Create the Staking pool
     */
    function createStakingPool(
        StakeToken _stakeToken,
        uint256 _endStakeTime,
        uint256 _farmMultiplier
    ) external onlyOwner {
        Pool memory pool;
        pool.stakeToken = _stakeToken;
        pool.endStakeTime = _endStakeTime;
        pool.farmMultiplier = _farmMultiplier;
        pools.push(pool);
        totalMultiplier += _farmMultiplier;
        uint256 poolId = pools.length - 1;
        emit PoolCreated(poolId);
    }

    /**
     * Return all pool
     */
    function getAllPool() public view returns (Pool[] memory) {
        return pools;
    }

    /**
     * Deposit to pool
     */
    function deposit(uint256 _poolId, uint256 _amount) external payable {
        require(_amount > 0, "Deposit amount can't be zero");
        Pool storage pool = pools[_poolId];
        StakerInfo storage staker = stakerInfo[_poolId][msg.sender];

        if (staker.firstStakeTime == 0) {
            staker.totalTokenStake = _amount;
            staker.firstStakeTime = 1;
            staker.finalStakeTime = 1;
        } else {
            staker.totalTokenStake += _amount;
            staker.finalStakeTime += 1;
        }

        StakingTimeInfo storage time = stakingTimeInfo[_poolId][msg.sender][
            staker.finalStakeTime
        ];

        // Update current time staker
        time.startBlock = block.number;
        time.depositStartTime = block.timestamp;
        time.amount = _amount;

        // Update pool
        pool.tokensStaked = pool.tokensStaked + _amount;

        // Deposit tokens
        emit Deposit(msg.sender, _poolId, _amount, staker.finalStakeTime);

        pool.stakeToken.safeTransferFrom(msg.sender, address(this), _amount);
    }

    /**
     * Withdraw all tokens from an existing pool
     */
    function withdraw(
        uint256 _poolId,
        uint256 _amount,
        uint256 _time
    ) public {
        require(_amount > 0, "Withdraw amount can't be zero");

        Pool storage pool = pools[_poolId];
        StakerInfo storage staker = stakerInfo[_poolId][msg.sender];
        StakingTimeInfo storage time = stakingTimeInfo[_poolId][msg.sender][
            _time
        ];

        //Check deposit duration
        uint256 depositDuration = block.timestamp - time.depositStartTime;

        if (depositDuration < pool.endStakeTime) {
            return;
        }

        // Pay rewards
        collectRewards(_poolId, _time);

        // Update staking time
        time.amount = 0;
        time.startBlock = 0;
        time.depositStartTime = 0;

        //Update staker info
        staker.totalTokenStake -= _amount;

        if (staker.firstStakeTime == _time) {
            if (staker.finalStakeTime == _time) {
                staker.finalStakeTime = 0;
                staker.firstStakeTime = 0;
            } else {
                staker.firstStakeTime += 1;
            }
        } else if (staker.finalStakeTime == _time) {
            staker.finalStakeTime -= 1;
        } else if (
            (_time - staker.firstStakeTime) <= (staker.finalStakeTime - _time)
        ) {
            for (uint256 i = _time; i >= staker.firstStakeTime; i--) {
                StakingTimeInfo storage time_1 = stakingTimeInfo[_poolId][
                    msg.sender
                ][i];
                StakingTimeInfo storage time_2 = stakingTimeInfo[_poolId][
                    msg.sender
                ][i - 1];

                time_1.amount = time_2.amount;
                time_1.startBlock = time_2.startBlock;
                time_1.depositStartTime = time_2.depositStartTime;
            }
            staker.firstStakeTime += 1;
        } else {
            for (uint256 i = _time; i <= staker.finalStakeTime; i++) {
                StakingTimeInfo storage time_1 = stakingTimeInfo[_poolId][
                    msg.sender
                ][i];
                StakingTimeInfo storage time_2 = stakingTimeInfo[_poolId][
                    msg.sender
                ][i + 1];

                time_1.amount = time_2.amount;
                time_1.startBlock = time_2.startBlock;
                time_1.depositStartTime = time_2.depositStartTime;
            }
            staker.finalStakeTime -= 1;
        }

        // Update pool
        pool.tokensStaked = pool.tokensStaked - _amount;

        // Withdraw tokens
        emit Withdraw(msg.sender, _poolId, _amount, _time);

        pool.stakeToken.safeTransfer(msg.sender, _amount);
    }

    /**
     * Collect rewards from a given pool id
     */
    function collectRewards(uint256 _poolId, uint256 _time) public {
        Pool storage pool = pools[_poolId];
        StakingTimeInfo storage time = stakingTimeInfo[_poolId][msg.sender][
            _time
        ];

        if (time.startBlock == 0) {
            return;
        }

        uint256 blocksSinceLastReward = block.number - time.startBlock;
        uint256 assetRatio = (time.amount * BIG_INT_FORMATTER) /
            pool.tokensStaked;
        uint256 rewardTokenPerBlockForPool = (pool.farmMultiplier *
            rewardTokensPerBlock *
            100) / totalMultiplier;
        uint256 rewardsToHarvest = (blocksSinceLastReward *
            assetRatio *
            rewardTokenPerBlockForPool) / (BIG_INT_FORMATTER * 100);

        if (rewardsToHarvest == 0) {
            return;
        }

        uint256 rewardFee = (rewardsToHarvest * 5) / 10000;
        uint256 harvest = rewardsToHarvest - rewardFee;
        time.startBlock = block.number;

        emit CollectRewards(msg.sender, _poolId, rewardsToHarvest, _time);
        rewardToken.mint(address(this), rewardFee);
        rewardToken.mint(msg.sender, harvest);
    }

    /**
     * Collect all rewards from a given pool id
     */

    function collectAllRewards(uint256 _poolId) public {
        StakerInfo storage staker = stakerInfo[_poolId][msg.sender];
        uint256 numberOfStakingTime = staker.finalStakeTime -
            staker.firstStakeTime;

        if (numberOfStakingTime == 0) {
            collectRewards(_poolId, staker.finalStakeTime);
        } else {
            for (
                uint256 i = staker.firstStakeTime;
                i <= staker.finalStakeTime;
                i++
            ) {
                collectRewards(_poolId, i);
            }
        }
    }

    /**
     * Get staker reward
     */
    function getRewardsInfor(uint256 _poolId, uint256 _time)
        public
        view
        returns (uint256)
    {
        Pool storage pool = pools[_poolId];
        StakingTimeInfo memory time = stakingTimeInfo[_poolId][msg.sender][
            _time
        ];

        if (time.startBlock == 0) {
            return 0;
        }

        uint256 blocksSinceLastReward = block.number - time.startBlock;
        uint256 assetRatio = (time.amount * BIG_INT_FORMATTER) /
            pool.tokensStaked;
        uint256 rewardTokenPerBlockForPool = (pool.farmMultiplier *
            rewardTokensPerBlock *
            100) / totalMultiplier;
        uint256 rewardsToHarvest = (blocksSinceLastReward *
            assetRatio *
            rewardTokenPerBlockForPool) / (BIG_INT_FORMATTER * 100);

        if (rewardsToHarvest == 0) {
            return 0;
        }

        uint256 rewardFee = (rewardsToHarvest * 5) / 10000;
        uint256 harvest = rewardsToHarvest - rewardFee;

        return harvest;
    }

    /**
     * Get Current Block Number
     */
    function getCurrentBlock() public view returns (uint256) {
        return block.number;
    }

    /**
     * Change Farm Multifier
     */
    function changeFarmMultifier(uint256 _poolId, uint256 _newFarmMultifier)
        public
    {
        Pool storage pool = pools[_poolId];

        require(msg.sender == owner());
        totalMultiplier -= pool.farmMultiplier;
        pool.farmMultiplier = _newFarmMultifier;
        totalMultiplier += _newFarmMultifier;

        emit ChangeFarmMultifier(_poolId, pool.farmMultiplier);
    }

    /**
     * Get total Multifier
     */
    function getTotalMultiplier() public view returns (uint256) {
        return totalMultiplier;
    }

    /**
     * Get reward token per block
     */
    function getRewardTokenPerBlock() public view returns (uint256) {
        return rewardTokensPerBlock;
    }

    /**
     * Update Reward token per Block
     */
    function updateRewardTokenPerBlock(uint256 _newReward) public {
        require(msg.sender == owner());
        rewardTokensPerBlock = _newReward;
        emit UpdateRewardTokenPerBlock(_newReward);
    }
}
