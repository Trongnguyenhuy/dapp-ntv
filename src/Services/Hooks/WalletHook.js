/* eslint-disable no-unused-vars */
import { useAddress, useChain, useConnectionStatus } from "@thirdweb-dev/react";
import { useStakeTokebalence } from "./TokenHook";

export const useWalletInfor = () => {
  const address = useAddress();
  const chain = useChain();
  const status = useConnectionStatus();
  const {
    data: balanceOfToken,
    isLoading,
    error,
  } = useStakeTokebalence(address);

  if (!address) {
    return {};
  }

  if (!isLoading && !error) {
    return {
      address: address,
      balanceOfStakeToken: parseInt(balanceOfToken?._hex) / 1e18,
      chain: chain,
      connectStatus: status,
    };
  }
  return {};
};
