/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { isSupportedChain } from "@/util";
import { getProvider } from "@/constants/provider";
import { useNavigate } from "react-router-dom";

const useCreateUser = (address: any, url: string, username: string) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const navigate = useNavigate();

  return useCallback(async () => {
    if (!isSupportedChain(chainId))
      return toast.error("Wrong network !", {
        position: "top-right",
      });

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const toastId = toast.loading("Registering...", {
      position: "top-right",
    });

    const registrationTx = {
      from: address,
      avatar: url,
      name: username,
    };

    try {
      const signature = await signer.signMessage(
        JSON.stringify(registrationTx)
      );

      const response = await fetch(
        "https://chatdapp-with-ens-ipfs-gasless.onrender.com/register-user",
        {
          method: "POST",
          body: JSON.stringify({ ...registrationTx, signature }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        toast.dismiss(toastId);
        navigate("/chat");
        return toast.success(jsonResponse.message, {
          position: "top-right",
        });
      } else {
        toast.dismiss(toastId);
        navigate("/signup");
        return toast.error(jsonResponse.message, {
          position: "top-right",
        });
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      navigate("/signup");
      toast.error("OOPS!! SOMETHING_WENT_WRONG", {
        position: "top-right",
      });
    }
  }, [username, url, address, chainId, walletProvider, navigate]);
};

export default useCreateUser;
