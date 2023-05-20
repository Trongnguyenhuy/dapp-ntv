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
export const getBalanceOfStakeToken = async (address) => {
  try {
    const balance = await StakeTokenServices.methods.balanceOf(address).call();

    return balance;
  } catch (err) {
    return false;
  }
};

// Lấy thông tin về pool muốn staking
export const getPoolInfor = async (poolId) => {
  const owner = await StakingServices.methods.owner().call();
  const poolFromContract = await StakingServices.methods.pools(poolId).call();

  const stakedToken = await StakeTokenServices.methods.symbol().call();

  return {
    owner: owner,
    StakedToken: stakedToken,
    totalTokenStaked: poolFromContract.tokensStaked,
    endStakeTime: poolFromContract.endStakeTime,
    farmMultiplier: poolFromContract.farmMultiplier,
  };
};

// Khởi tạo pool muốn staking và approve số lượng token stake vào.
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
    const rewards = await updatePoolRewards(poolId);
    const currentBlock = await StakingServices.methods.getCurrentBlock().call();

    return {
      amountOfStakeTokenOnPool: stakerInfor.amount,
      depositStartTime: stakerInfor.depositStartTime,
      rewards: rewards,
      startBlock: stakerInfor.startBlock,
      currentBlock: currentBlock,
    };
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
    const rewardTokenPerBlockForPool = poolWeight * rewardTokenPerBlock*1e12;

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
    const poolMultifier = (farmMultiplier) / totalMultiplier;

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
    const rewardTokenPerBlockForPool = poolMultifier * rewardTokenPerBlock*1e12;
    const { totalTokenStaked } = await getPoolInfor(poolId);
    const assetPartion =
      (wei) / totalTokenStaked;
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
