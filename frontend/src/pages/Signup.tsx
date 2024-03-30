/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "@/components/shared/Form"
import { useCheckUser } from "@/hooks/useCheckUser";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { ZeroAddress } from "ethers";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const { isConnected, address } = useWeb3ModalAccount();
    const navigate = useNavigate();

    const user: any = useCheckUser(address);


    const change = useCallback(() => {
        if (isConnected) {
            if (user.address && user.address !== ZeroAddress) {
                navigate("/chat");
            } else {
                navigate("/signup");
            }
        } else {
            navigate("/");
        }
    }, [isConnected, navigate, user.address]);

    useEffect(() => {
        change();
    }, [change, isConnected, user.address]);
    return (
        <div className="w-full h-full flex flex-col justify-between items-center">
            <Form />
        </div>
    )
}

export default Signup