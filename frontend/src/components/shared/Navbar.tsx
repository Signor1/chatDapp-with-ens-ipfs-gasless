import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { Link } from "react-router-dom"


const Navbar = () => {
    const { isConnected } = useWeb3ModalAccount();
    return (
        <header className="w-full flex justify-between items-center py-6 border-b border-stone-100/30 px-4">
            <Link to="/" className="font-light text-xl text-stone-100">
                Chat<span className="font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Zone</span>
            </Link>
            {
                !isConnected && (
                    <div className="flex items-center justify-center gap-4">
                        <Link className="font-light text-stone-100" to="/">Home</Link>
                        <Link className="font-light text-stone-100" to="/signup">Signup</Link>
                        <Link className="font-light text-stone-100" to="/chat">Chat</Link>
                    </div>
                )
            }
            <w3m-button />
        </header>
    )
}

export default Navbar