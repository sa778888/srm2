"use client";
import WalletHeader from "@/components/Header";
import Link from "next/link";
import "@/app/globals.css";
export default function Home() {
  return (
    <div className="bgr">
      <WalletHeader />
      <div className=" min-h-screen  text-white">
        <div className="container mx-auto py-20 px-6">
          <h1 className="text-7xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-900 via-green-600 to-green-200">
            Welcome to Shardeum <br /> Dapp Boilerplate
          </h1>
          <p className="text-2xl text-center mb-12 ">
            Kickstart your decentralized application journey with confidence.
          </p>
          <div className="flex">
            <div>
              <div className="flex justify-center">
                <div className="w-2/3 space-y-8">
                  {" "}
                  <div className="bg-gradient-to-r from-green-950 via-green-700 to-green-500 p-8 rounded-xl">
                    <h2 className="text-xl font-bold mb-4">Blockchain RPC</h2>
                    <p className="text-sm">
                      Seamless real-time Shardeum RPC call functionalities. Dive
                      into the vast universe of queries, transactions, and smart
                      contracts.
                    </p>
                  </div>{" "}
                  <div className="bg-gradient-to-r from-green-950 via-green-700 to-green-500 p-8 rounded-xl">
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
              <img className="p-8" src="/blockchain_image.jpg" alt="" />
            </div>
            <div className="flex justify-center">
              <div className="w-2/3 space-y-8">
                <div className="">
                  <div className="mb-8">
                    <div className="bg-gradient-to-r from-green-950 via-green-700 to-green-500 p-8 rounded-xl">
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
                        <button className="bg-green-400 text-black hover:text-green-400 hover:bg-black border border-green-400 hover:border-green-400 transition duration-500 px-2 py-1 rounded-xl">
                          Get Started
                        </button>
                      </Link>
                      <a
                        href="https://github.com/Shardeum/shardeum-dapp-boilerplate"
                        className="bg-black text-green-400 hover:text-black hover:bg-green-400 border border-black transition duration-500 px-2 py-1 rounded-xl"
                      >
                        <span>Contribute</span>
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
  );
}
