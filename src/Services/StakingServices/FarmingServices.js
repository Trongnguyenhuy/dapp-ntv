import web3 from "../Web3/Web3";
import rewardTokenServices from "./RewardTokenServices";
import StakeTokenServices from "./StakeTokenServices";
import StakingServices from "./StakingServices";

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
    lastRewardedBlock: poolFromContract.lastRewardedBlock,
    accumulatedRewardsPerShare: poolFromContract.accumulatedRewardsPerShare,
  };
};

// Khởi tạo pool muốn staking và approve số lượng token stake vào.
export const createStakingToken = async () => {
  try {
    const address = await getAccountAddress();
    const poolAddress = await StakingServices.options.address;

    const allowance = checkAllowance(address, poolAddress);

    if (allowance == 0) {
      await approveStakingPool(1000);
    }

    await StakingServices.methods
      .createStakingPool(StakeTokenServices.options.address)
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
    const poolAddress = await StakingServices.options.address;

    const allowance = checkAllowance(address, poolAddress);

    if (allowance == 0) {
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
      amountOfStakeTokenOnPool: stakerInfor.amount,
      rewardDebt: stakerInfor.rewardDebt,
      rewards: stakerInfor.rewards,
      startBlock: stakerInfor.startBlock,
    };
  } catch (err) {
    return false;
  }
};

// Thực hiện thao tác Unstake lấy token từ pool về lại tài khoản
export const unStakingToken = async (poolId, numberOfToken) => {
  try {
    const address = await getAccountAddress();
    const wei = web3.utils.toWei(`${numberOfToken}`, "ether");
    await StakingServices.methods.withdraw(poolId, wei).send({
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
    console.log("address", address);
    console.log("poolAddress", poolAddress);
    console.log("wei", wei);
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

    await StakingServices.methods.collectRewards(poolId).call({
      from: address,
    });

    const afterBalance = await rewardTokenServices.methods
      .balanceOf(address)
      .call({
        from: address,
      });

    return afterBalance - beforeBalance;
  } catch (err) {
    return false;
  }
};

// Cập nhật thông tin phần thưởng trong pool
export const updatePoolRewards = async (poolId) => {
  try {
    // const address = await getAccountAddress();

    const beforeStakerInfor = await getStakerInfo(poolId);

    await StakingServices.methods.updatePoolRewards(poolId).call();

    const afterStakerInfor = await getStakerInfo(poolId);

    if (beforeStakerInfor.rewards <= afterStakerInfor) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
