"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../dashboard/_components/navbar'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { Contract } from 'ethers'
import MainContract from '@/abis/MainContract'
import { WalletContext } from '@/context/WalletContext'
import { toast } from 'sonner'

const fetchData = async (signer) => {
    //getAllPapersByUser
    const contract = new Contract("0x428Fd24d902D32d27fA67009245f0E94d9267915", MainContract, signer);
    const response = await contract.getAllPapersByUser();
    console.log(response, "response")
    return response;
}


const HistoryPage = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { signer } = useContext(WalletContext);
    useEffect(() => {
        fetchData(signer).then((res)=>{
            setData(res);
            toast.success("Fetched Data")
        }).catch((err)=>{
            console.log(err);
            toast.error("Something wrong happend!")
        })
    }, [])
    return (
        <div className='flex min-w-screen min-h-screen bg-black items-center justify-center p-4'>
            <Navbar />
            <Card className="flex flex-col min-w-96 min-h-96 space-y-4 w-fit h-fit p-4">
                <CardTitle>Your Research History</CardTitle>
                <CardDescription>List of your recently minted papers</CardDescription>
                <CardContent>
                    {
                        (isLoading || !data) && <div className="flex items-center justify-center"><Loader2 className='animate-spin w-6 h-6' /></div>
                    }
                    {
                       (data && data.length == 0)&&"Nothing here."
                    }
                    {
                       (data && data.length > 0)&& data?.map((item,index)=>{
                        return <a href={`ipfs://${item}`} className='inline-flex'>{index+1} Open here <ArrowUpRight/></a>
                       })
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default HistoryPage
