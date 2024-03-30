/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProvider } from "@/constants/provider";
import { isSupportedChain } from "@/util";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { toast } from "react-toastify";

const useSendMessage = (from: string, msg: string, to: string) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId))
      return toast.error("Wrong network !", {
        position: "top-right",
      });

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const messageTx = {
      from: from,
      msg: msg,
      to: to,
    };

    try {
      const signature = await signer.signMessage(JSON.stringify(messageTx));

      const response = await fetch(
        "https://ens-contract.onrender.com/forward-message",
        {
          method: "POST",
          body: JSON.stringify({ ...messageTx, signature }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        return toast.success(jsonResponse.message, {
          position: "top-right",
        });
      } else {
        return toast.error(jsonResponse.message, {
          position: "top-right",
        });
      }
    } catch (error: any) {
      // console.error("error: ", error);
      toast.error("OOPS!! SOMETHING_WENT_WRONG", {
        position: "top-right",
      });
    }
  }, [chainId, walletProvider, from, msg, to]);
};

export default useSendMessage;
