/* eslint-disable @typescript-eslint/no-explicit-any */
import Sidebar from "@/components/shared/Sidebar";
import { useGetAllUsers } from "@/hooks/useGetAllUsers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { Outlet } from "react-router-dom";


const ChatLayout = () => {
    const { isConnected, address } = useWeb3ModalAccount();

    const data = useGetAllUsers();

    const currentUser = data.filter((user: { address: string }) => user.address === address)[0];

    const listOfUsers = data.filter((user: { address: string }) => user.address !== address);

    return (
        <div className="w-full h-full overflow-y-auto bg-stone-950 mx-auto rounded-md flex flex-col">

            {
                isConnected && (
                    <div className="w-full h-full max-w-[1440px] overflow-y-auto bg-stone-950 mx-auto rounded-md flex">
                        <Sidebar currentUser={currentUser} listOfUsers={listOfUsers} />
                        <Outlet context={currentUser} />
                    </div>
                )
            }
            {
                !isConnected && (
                    <div className="w-full h-full max-w-[1440px] flex flex-col justify-center items-center overflow-y-auto bg-stone-950 mx-auto rounded-md ">
                        <h1 className="text-stone-100 text-4xl">Please connect your wallet</h1>
                    </div>
                )
            }


        </div>
    )
}

export default ChatLayout