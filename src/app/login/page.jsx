"use client"
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { Button } from '@/components/ui/button'
import { WalletContext } from '@/context/WalletContext'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
const gra = "bg-gradient-to-r from-purple-400 to-yellow-400"
const page = () => {
    const { connected, signer, connectWallet,disconnectWallet } = useContext(WalletContext);
    const [isLoading, setIsLoading] = useState(false);
    const handleMetamask = () => {
        if (!window.ethereum) {
            toast.error('Metamask not found')
            return;
        }
        setIsLoading(true);
        try {
            const result = connectWallet();

        } catch (error) {
            setIsLoading(false);
        }

    }
    useEffect(() => {
        if (connected) {
            toast.success('Connected to Metamask');
        }
    }, [connected])
    return (
        <div className='bg-zinc-700'>
            <BackgroundGradientAnimation firstColor='FDA403' secondColor='430A5D' thirdColor='FF8E8F' fourthColor='124076' className='flex w-screen h-screen overflow-hidden items-center justify-center'>
                <div className='flex z-10 flex-col items-center justify-between bg-black/30 p-6 rounded-2xl h-96 w-80'>
                    <h1 className='text-2xl font-semibold text-white'> Metamask</h1>
                    <div className="rounded-full p-6 bg-black/20">
                        <Image src='/svg/metamask.svg' width={100} height={100} />
                    </div>
                    {
                        connected ? (<Button variant={"accent"} className="text-white"
                        onClick={disconnectWallet}
                    >
                        Disconnect Wallet <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>): (<Button variant = { "accent" } className = "text-white"
                        onClick = { handleMetamask }
                        >
                        Get Started with Metamask <ArrowRight className="w-4 h-4 ml-2" />
                </Button>)
                    }
        </div>
            </BackgroundGradientAnimation >
        </div >
    )
}

export default page
