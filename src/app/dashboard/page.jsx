"use client"
import MainContract from '@/abis/MainContract';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { WalletContext } from '@/context/WalletContext';
import { uploadToIPFS } from '@/lib/ipfs';
import { Contract } from 'ethers';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Loader2 } from 'lucide-react';

const addResearchPaperToUser = async ({ hash, signer, title, abstract, date, authors }) => {
    try {
        const contract = new Contract("0xfb1D8CF8A8cd95eB39Efd5a78F6122bEC568319a", MainContract, signer);
        const response = await contract.publishPaper(
            hash,
            title,
            abstract,
            date,
            authors
        );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const DashboardPage = () => {
    const [file, setFile] = useState(null);
    const { signer } = useContext(WalletContext);
    const [uploadRes, setUploadRes] = useState(null);
    const [title, setTitle] = useState('');
    const [paperAbstract, setAbstract] = useState('');
    const [dateOfPublication, setDate] = useState('');
    const [authors, setAuthors] = useState('');
    const [resp2,setResponse2] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className='bg-white/10 p-12  rounded-xl border-green-500 space-y-6'>
            <p className="font-semibold text-white">
                Upload your research paper to mint an NFT
            </p>
            <Input type="text" className="text-white"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />

            <Input type="text" className="text-white"
                onChange={(e) => setAbstract(e.target.value)}
                placeholder="Abstract"
            />


            <Input type="text" className="text-white"
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date of Publication"
            />
            <Input type="text" className="text-white"
                onChange={(e) => setAuthors(e.target.value)}
                placeholder="Authors"
            />
            <Input type="file" className="text-white"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <Button className="border-red-400" type="submit"
                onClick={() => {
                    setIsLoading(true);
                    uploadToIPFS(file).then((res) => {
                        setUploadRes(res);
                        console.log(res);
                        addResearchPaperToUser({
                            hash: res.IpfsHash,
                            signer,
                            title,
                            abstract: paperAbstract,
                            date: dateOfPublication,
                            authors: ["asd", "asd", "asd"]
                        }).then((resp2) => {
                            setResponse2(resp2)
                            toast.success("File uploaded successfully");
                            //Open a new tab at the IPFS in new tab
                            setIsLoading(false);
                            window.open(`https://ipfs.io/ipfs/${res.IpfsHash}`);
                        }).catch((err) => {
                            toast.error("Error uploading file");
                            console.log(err);
                            throw err;
                        })
                    }
                    ).catch((err) => {
                        toast.error("Error uploading file");
                        console.log(err);
                        setIsLoading(false);
                    })
                }}
                disabled={isLoading}
                >
                {
                    isLoading? <Loader2 className='animate-spin w-4 h-4'/>: "Submit"
                }
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Title</CardTitle>
                    <CardDescription>Your Title is `{title}`</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Author : {authors}</p>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col space-y-4">
                    <p>IPFS Hash : {uploadRes?.IpfsHash}</p>
                    <p>Transaction Hash:</p>
                    {
                        resp2?.hash
                    }
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default DashboardPage
