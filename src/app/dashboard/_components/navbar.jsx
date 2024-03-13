"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { WalletContext } from '@/context/WalletContext'
import { WalletOutlined } from '@ant-design/icons'
import { ArrowRight, Wallet2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { toast } from 'sonner'


export const Navbar = () => {
    const { balance, connected } = useContext(WalletContext);
    const router = useRouter();
    useEffect(() => {
        if (!connected) {
            toast.error('Please sign again!')
            return router.push('/login');
        }
    }, [connected])
    return (
        <div className='fixed top-0 h-12 w-full p-2 '>
            <div className="w-full px-4 flex justify-between ">
                <div className="flex flex-row w-fit items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="bg-white/10">CN</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">
                        <p className=' font-semibold'>
                            {
                                connected ? (<span className='inline-flex items-center space-x-2 text-white'>
                                    <WalletOutlined size={24} />
                                    {balance.slice(0, 5)} SHM
                                </span>) : (<span className='inline-flex items-center space-x-4'>
                                    <Wallet2 size={20} />
                                    Connect Wallet
                                    </span>)
                            }
                        </p>
                    </Button>
                </div>
                <Button variant="link"
                onClick={()=>{
                    return router.push("/history")
                }}>
                    See Older papers <ArrowRight className='w-4 h-4'/>
                </Button>
            </div>
        </div>
    )
}
