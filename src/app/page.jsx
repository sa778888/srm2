
"use client";
import WalletHeader from "@/components/Header";
import Link from "next/link";
import "@/app/globals.css";
import Wrap from "./framermotion/motion";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <Wrap>
      <div className="bgr">
        <WalletHeader />
        <div className=" min-h-screen  text-white">
          <div className="container mx-auto py-20 px-6">
            <h1 className="text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
              Welcome to Shardeum <br /> Dapp Boilerplate
            </h1>
            <p className="text-lg text-center mb-12">
              Kickstart your decentralized application journey with confidence.
            </p>
            <div className="flex">
              <div>
                <div className="flex justify-center">
                  <div className="w-2/3 space-y-8">
                    {" "}
                    <div className="bg-gray-800 p-8 rounded-xl">
                      <h2 className="text-xl font-bold mb-4">Blockchain RPC</h2>
                      <p className="text-sm">
                        Seamless real-time Shardeum RPC call functionalities. Dive
                        into the vast universe of queries, transactions, and smart
                        contracts.
                      </p>
                    </div>{" "}
                    <div className="bg-gray-800 p-8 rounded-xl">
                      <h2 className="text-xl font-bold mb-4">NFT Minting</h2>
                      <p className="text-sm">
                        Mint your own NFTs from an NFT collection on the Shardeum
                        blockchain with ease.
                      </p>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="flex justify-center">
                <img className="" src="./head.png" alt="" />
              </div>
              <div className="flex justify-center">
                <div className="w-2/3 space-y-8">
                  <div className="">
                    <div className="mb-8">
                      <div className="bg-gray-800 p-8 rounded-xl">
                        <h2 className="text-xl font-bold mb-4">
                          DeFi Explorations
                        </h2>
                        <p className="text-sm">
                          Discover the world of DeFi by building with one of the
                          biggest DeFi protocols in the web3 space - Uniswap.
                        </p>
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div className="flex justify-center gap-8">
                        <Link href="/rpc">
                          <Button className="py-6 px-6 text-lg bg-white text-black hover:bg-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Get Started
                          </Button>
                        </Link>
                        <a
                          href="https://github.com/Shardeum/shardeum-dapp-boilerplate"
                          className="flex items-center py-6 px-6 text-lg bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <span>Contribute</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 21v-8l-4-4 4-4v8l5 5-5 5z"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Wrap>
  );
}
