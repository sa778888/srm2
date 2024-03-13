"use client"
import MainContract from '@/abis/MainContract';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { WalletContext } from '@/context/WalletContext';
import { uploadToIPFS } from '@/lib/ipfs';
import { Contract } from 'ethers';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';

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

    return (
        <div className='bg-white/10 p-6 rounded-xl space-y-4'>
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
            <Button type="submit"
                onClick={() => {
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
                        }).then(() => {

                            toast.success("File uploaded successfully");
                            //Open a new tab at the IPFS in new tab

                            window.open(`https://ipfs.io/ipfs/${res.IpfsHash}`);
                        }).catch((err) => {
                            toast.error("Error uploading file");
                            console.log(err);
                        })
                    }
                    ).catch((err) => {
                        toast.error("Error uploading file");
                        console.log(err);
                    })
                }}>
                Submit
            </Button>
        </div>
    )
}

export default DashboardPage
