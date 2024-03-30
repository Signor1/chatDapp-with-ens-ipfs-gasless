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
import { getENSContract } from "@/constants/contract";

const useCreateUser = (username: string, url: string) => {
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

    const contract = getENSContract(signer);

    try {
      const transaction = await contract.createAccount(url, username);

      console.log("transaction: ", transaction);

      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        navigate("/chat");
        return toast.success("user account created successfully !", {
          position: "top-right",
        });
      }

      toast.error("account creation failed !", {
        position: "top-right",
      });
    } catch (error: any) {
      // console.error("error: ", error);
      navigate("/signup");
      toast.error(`${error.message.slice(0, 20)}...`, {
        position: "top-right",
      });
    }
  }, [username, url, chainId, walletProvider, navigate]);
};

export default useCreateUser;
