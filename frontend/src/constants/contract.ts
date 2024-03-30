import { ethers } from "ethers";
import ensABI from "./ensAbi.json";
import chatAbi from "./chatAbi.json";

export const getENSContract = (
  providerOrSigner: ethers.Provider | ethers.Signer
) => {
  return new ethers.Contract(
    import.meta.env.VITE_ENS_CONTRACT_ADDRESS,
    ensABI,
    providerOrSigner
  );
};

export const getChatContract = (
  providerOrSigner: ethers.Provider | ethers.Signer
) => {
  return new ethers.Contract(
    import.meta.env.VITE_CHAT_CONTRACT_ADDRESS,
    chatAbi,
    providerOrSigner
  );
};
