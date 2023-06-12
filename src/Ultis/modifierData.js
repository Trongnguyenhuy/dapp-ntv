import { convertBigNumber } from "../Services/StakingServices/FarmingHook";

export const bignumberModifier = (arr) => {
  let modifierData = arr.map((item) => {
    return {
      // endStakeTime: ethers.utils.formatUnits(item.endStakeTime),
      endStakeTime: convertBigNumber(item.endStakeTime),
      farmMultiplier: convertBigNumber(item.farmMultiplier),
      stakeToken: item.stakeToken,
      tokensStaked: convertBigNumber(item.tokensStaked),
    };
  });

  return modifierData;
};
