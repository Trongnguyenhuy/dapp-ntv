import { convertSecondsToDateTime } from "../../Ultis/NetworkCheck/NetworkCheck";
import web3 from "../Web3/Web3";
import rewardTokenServices from "./RewardTokenServices";
import StakeTokenServices from "./StakeTokenServices";
import StakingServices from "./StakingServices";

const NUMBEROFBLOCKPERDAY = 43000;

// Lấy địa chỉ ví của người dùng.
export const getAccountAddress = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    return accounts[0];
  } catch (err) {
    return false;
  }
};

// Lấy số lượng token muốn stake trong địa chỉ address.
export const getBalanceOfStakeToken = async () => {
  try {
    const address = await getAccountAddress();
    const balance = await StakeTokenServices.methods.balanceOf(address).call();

    return balance;
  } catch (err) {
    return false;
  }
};

// Lấy thông tin về pool muốn staking !!!
export const getPoolInfor = async (poolId) => {
  console.log("xxxx", StakeTokenServices.methods);
  const owner = await StakingServices.methods.owner().call();
  console.log("swwf", owner);
  const poolFromContract = await StakingServices.methods.pools(poolId).call();

  const stakedToken = await StakeTokenServices.methods.symbol().call();


  return {
    owner: owner, //nguoi so huu
    StakedToken: stakedToken, 
    totalTokenStaked: poolFromContract.tokensStaked,
    endStakeTime: poolFromContract.endStakeTime, //thoi gian cuoi
    farmMultiplier: poolFromContract.farmMultiplier, //ti trong
    poolSize: poolFromContract.poolSize, //
    open: !poolFromContract.open,
  };
};

// Khởi tạo pool muốn staking và approve số lượng token stake vào. !!!
export const createStakingToken = async (depositDuration, farmMultiplier) => {
  try {
    const address = await getAccountAddress();

    await StakingServices.methods
      .createStakingPool(
        StakeTokenServices.options.address,
        depositDuration,
        farmMultiplier
      )
      .send({
        from: address,
      });

    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

// Stake token vào pool
export const depositTokenToPool = async (poolId, numberOfToken) => {
  try {
    const address = await getAccountAddress();
    const wei = web3.utils.toWei(`${numberOfToken}`, "ether");
    const allowance = await checkAllowance();

    if (allowance == false) {
      await approveStakingPool(numberOfToken);
    }

    await StakingServices.methods.deposit(poolId, wei).send({
      from: address,
    });

    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

// Lấy thông tin về người dùng đã stake token vào.
export const getStakerInfo = async (poolId) => {
  try {
    const address = await getAccountAddress();
    const stakerInfor = await StakingServices.methods
      .stakerInfo(poolId, address)
      .call();

    return {
      totalTokenStake: stakerInfor.totalTokenStake,
      firstStakeTime: stakerInfor.firstStakeTime,
      finalStakeTime: stakerInfor.finalStakeTime,
    };
  } catch (err) {
    return false;
  }
};

// Lấy thông tin về người dùng đã stake token vào.
export const getStakingTimeInfo = async (poolId, time) => {
  try {
    const address = await getAccountAddress();
    const stakingTimeInfor = await StakingServices.methods
      .stakingTimeInfo(poolId, address, time)
      .call();
    const currentBlock = await StakingServices.methods.getCurrentBlock().call();

    const reward = await StakingServices.methods
      .getRewardsInfor(poolId, time)
      .call({
        from: address,
      });

    return {
      currentBlock: currentBlock,
      startBlock: stakingTimeInfor.startBlock,
      depositStartTime: convertSecondsToDateTime(
        stakingTimeInfor.depositStartTime
      ),
      amount: stakingTimeInfor.amount,
      rewardRate: stakingTimeInfor.rewardRate / 1e14,
      reward: reward,
    };
  } catch (err) {
    return false;
  }
};

// Lấy ra tổng số reward của tất cả các lần nạp
export const totalReward = async (poolId, start, end) => {
  try {
    const stakingTimeArr = await getAllStakingTimeInfo(poolId, start, end);

    if (stakingTimeArr.length == 1) {
      return stakingTimeArr[0].reward;
    }

    const totalAmount = stakingTimeArr.reduce(
      (reward, item) => reward + +item.reward,
      0
    );
    return totalAmount;
  } catch (err) {
    return false;
  }
};

// Lấy tất cả thông tin về những lần staking vào pool
export const getAllStakingTimeInfo = async (poolId, start, end) => {
  let arr = [];
  let stakingTimeInfo = [];

  try {
    if (start === end) {
      const stakingTime = await getStakingTimeInfo(poolId, end);
      stakingTimeInfo.push(stakingTime);
      return stakingTimeInfo;
    }

    for (let i = start; i <= end; i++) {
      arr.push(i);
    }

    for (const item of arr) {
      const stakingTime = await getStakingTimeInfo(poolId, item);
      stakingTimeInfo.push(stakingTime);
    }

    return stakingTimeInfo;
  } catch (err) {
    return false;
  }
};

// Thực hiện thao tác Unstake lấy token từ pool về lại tài khoản
export const unStakingToken = async (poolId, numberOfToken) => {
  try {
    const address = await getAccountAddress();
    await StakingServices.methods.withdraw(poolId, numberOfToken).send({
      from: address,
    });
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export const getAllPools = async () => {
  try {
    const pools = await StakingServices.methods.getAllPool().call();

    return pools;
  } catch (err) {
    return false;
  }
};

// Approve địa chỉ nhận token với số lượng numberOfToken
export const approveStakingPool = async (numberOfToken) => {
  try {
    const address = await getAccountAddress();
    const poolAddress = await StakingServices.options.address;
    const wei = web3.utils.toWei(`${numberOfToken}`, "ether");
    const approve = await StakeTokenServices.methods
      .approve(poolAddress, wei)
      .send({
        from: address,
      });
    return approve;
  } catch (err) {
    return false;
  }
};

// Kiểm tra allowance giữa hai địa chỉ
export const checkAllowance = async () => {
  try {
    const address = await getAccountAddress();
    const poolAddress = await StakingServices.options.address;
    const allowanceNumber = await StakeTokenServices.methods
      .allowance(address, poolAddress)
      .call();

    return allowanceNumber;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

// Thu nhận token thưởng từ pool
export const harvestReward = async (poolId) => {
  try {
    const address = await getAccountAddress();
    const beforeBalance = await rewardTokenServices.methods
      .balanceOf(address)
      .call({
        from: address,
      });

    await StakingServices.methods.collectRewards(poolId).send({
      from: address,
    });

    const afterBalance = await rewardTokenServices.methods
      .balanceOf(address)
      .call({
        from: address,
      });

    const diff = afterBalance - beforeBalance;
    if (diff > 0) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

// Cập nhật thông tin phần thưởng trong pool
export const updatePoolRewards = async (poolId) => {
  try {
    const address = await getAccountAddress();
    const rewards = await StakingServices.methods.getRewardsInfor(poolId).call({
      from: address,
    });
    return rewards;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// cho biết giá trị ARP của một pool có poolId tương ứng
export const getGlobalARP = async (poolId) => {
  try {
    const { totalTokenStaked } = await getPoolInfor(poolId);
    const poolWeight = await getPoolMultifier(poolId);
    const rewardTokenPerBlock = await StakingServices.methods
      .getRewardTokenPerBlock()
      .call();
    const rewardTokenPerBlockForPool = poolWeight * rewardTokenPerBlock * 1e12;

    const globalARP =
      (rewardTokenPerBlockForPool * NUMBEROFBLOCKPERDAY * 365 * 100) /
      totalTokenStaked;

    return globalARP;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

// Cho biết có bao nhiêu phần token sẽ được trả về 1 block cho 1 pool tương ứng với poolId
export const getPoolMultifier = async (poolId) => {
  try {
    const { farmMultiplier } = await getPoolInfor(poolId);
    const totalMultiplier = await StakingServices.methods
      .getTotalMultiplier()
      .call();
    const poolMultifier = farmMultiplier / totalMultiplier;

    return poolMultifier;
  } catch (err) {
    return false;
  }
};

//Tính toán ARP của một cá nhân khi staking một số lượng token vào một farm nhất định.
export const predictInvidualARP = async (numberOfTokenStack, poolId) => {
  try {
    const wei = web3.utils.toWei(`${numberOfTokenStack}`, "ether");
    const rewardTokenPerBlock = await StakingServices.methods
      .getRewardTokenPerBlock()
      .call();
    const poolMultifier = await getPoolMultifier(poolId);
    const rewardTokenPerBlockForPool =
      poolMultifier * rewardTokenPerBlock * 1e12;
    const { totalTokenStaked } = await getPoolInfor(poolId);
    const assetPartion = wei / totalTokenStaked;
    const invidualARP =
      (assetPartion *
        rewardTokenPerBlockForPool *
        NUMBEROFBLOCKPERDAY *
        365 *
        100) /
      totalTokenStaked;
    return invidualARP;
  } catch (err) {
    return false;
  }
};
