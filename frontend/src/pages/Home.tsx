/* eslint-disable @typescript-eslint/no-explicit-any */
import { SparklesCore } from "@/components/ui/Sparkle"
import { useWeb3ModalAccount } from "@web3modal/ethers/react"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Home = () => {
    const { isConnected } = useWeb3ModalAccount();
    const navigate = useNavigate();


    const change = useCallback(async () => {
        if (isConnected) {
            navigate("/signup");
        } else if (!isConnected) {
            navigate("/");
        }
    }, [isConnected, navigate]);

    useEffect(() => {
        change();
    }, [change, isConnected]);

    return (
        <div className="h-[40rem] w-full bg-stone-950 flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="md:text-5xl text-4xl lg:text-7xl font-bold text-center relative z-20 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text tracking-widest text-transparent">
                Connect & Explore
            </h1>
            <h3 className="text-xl my-1.5 md:text-2xl lg:text-3xl text-stone-200 font-light inter-var text-center">Experience the future of communication with ChatZone.</h3>
            <div className="w-[40rem] h-40 relative">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-pink-400 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-pink-400 to-transparent h-px w-1/4" />

                {/* Core component */}
                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={1200}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />

                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute inset-0 w-full h-full bg-stone-950 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
        </div>
    )
}

export default Home