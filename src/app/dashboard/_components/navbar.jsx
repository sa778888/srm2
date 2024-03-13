"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { WalletContext } from '@/context/WalletContext'
import { WalletOutlined } from '@ant-design/icons'
import { Wallet2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { toast } from 'sonner'


export const Navbar = () => {
    const { balance, connected } = useContext(WalletContext);
    const router = useRouter();
    useEffect(() => {
        if(!connected){
            //toast.error('Wallet not connected')
           return router.push('/login');
        }
    }, [connected])
    return (
        <div className='fixed top-0 h-12 w-full p-2 '>
            <div className="w-full px-4 flex justify-between">
                <div className="w-fit">
                    <Avatar>
                        <AvatarImage src="https://randomuser.me/api/port" />
                        <AvatarFallback className="bg-white/10">CN</AvatarFallback>
                    </Avatar>
                    <p className='inline-flex font-semibold'>
                        {
                            connected ? (<WalletOutlined size={24} />) : (<Skeleton className="w-16 h-8" />)
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}
