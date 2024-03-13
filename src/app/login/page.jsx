"use client"
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { WalletContext } from '@/context/WalletContext'
import { getContract } from '@/lib/contract'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { providers, Contract } from 'ethers';
import MainContract from '@/abis/MainContract'
const gra = "bg-gradient-to-r from-purple-400 to-yellow-400"
const page = () => {
    const router = useRouter();
    const { connected, signer, connectWallet, disconnectWallet, isMember } = useContext(WalletContext);
    const [isLoading, setIsLoading] = useState(false);
    const handleMetamask = async () => {
        if (!window.ethereum) {
            toast.error('Metamask not found')
            return;
        }
        setIsLoading(true);
        try {
            const newSigner = await connectWallet();
            console.log(newSigner, "newSigner");
            setIsLoading(false);
            const provider = new providers.Web3Provider(window.ethereum);
            console.log(provider, "provider");
            //const signer = (new providers.Web3Provider(window.ethereum)).getSigner();
            const contract = new Contract("0xfb1D8CF8A8cd95eB39Efd5a78F6122bEC568319a", MainContract, newSigner.signer);
            console.log(contract, "contract");

            const isMember = await contract.isUserPresent(newSigner.address);
            if (!isMember) {
                //setIsMember(false);
                await contract.registerUser();
                toast.success('User registered successfully');
            }
            //toast.info(`ismem ${JSON.stringify(isMember)}`)
            return router.push('/dashboard');
        } catch (error) {
            setIsLoading(false);
            toast.error('Error connecting to Metamask');
            console.log(error);
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
                <div className='flex z-10 flex-col items-center justify-between bg-black/30 p-6 rounded-2xl h-96 w-80 lg:h-108 lg:w-96'>
                    <h1 className='text-2xl font-semibold text-white'> Metamask</h1>
                    <div className="rounded-full p-6 bg-black/20">
                        <Image src='/svg/metamask.svg' width={100} height={100} alt="Metamask" />
                    </div>
                    <div className="w-full">
                        <p className='text-white text-center font-medium'>Connect your Metamask wallet to get started!</p>
                        {isMember && <p className='text-white text-center font-medium'>You are already a member</p>}
                    </div>
                    {
                        connected ? (<Button variant={"accent"} className="text-white"
                            onClick={disconnectWallet}
                        >
                            Disconnect Wallet <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>) : (<Button variant={"accent"} className="text-white"
                            onClick={handleMetamask}
                            disabled={isLoading}
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
