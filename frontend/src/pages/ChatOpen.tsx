/* eslint-disable @typescript-eslint/no-explicit-any */
import MessageContainer from "@/components/shared/MessageContainer"
import { useCheckUser } from "@/hooks/useCheckUser";
import { useParams } from "react-router-dom"


const ChatOpen = () => {
    const { address: userAddress } = useParams();
    const user: any = useCheckUser(userAddress);

    return (
        <>
            <MessageContainer user={user} />
        </>
    );
}

export default ChatOpen