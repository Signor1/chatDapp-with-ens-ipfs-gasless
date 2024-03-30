/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";

//when wallet is not connected, connects to the sepolia rpc
export const readOnlyProvider = new ethers.JsonRpcProvider(
  import.meta.env.VITE_INFURA_RPC_URL
);

export const wssProvider = new ethers.WebSocketProvider(
  import.meta.env.VITE_WEB_SOCKET_RPC_URL
);

//browser wallet is connect (read-write provider)
export const getProvider = (provider: any) =>
  new ethers.BrowserProvider(provider);
