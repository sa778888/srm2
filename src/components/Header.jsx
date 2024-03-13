import Link from "next/link";
import { ethers } from "ethers";
import { Layout, Modal, Space, Typography } from "antd";
import { useContext, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { WalletOutlined } from "@ant-design/icons";
import { WalletContext } from "@/context/WalletContext";
import { useRouter } from "next/navigation";
const { Header } = Layout;
import { Button } from '@/components/ui/button'
const WalletHeader = () => {
  const router = useRouter();
  const {
    selectedAddress,
    setSelectedAddress,
    balance,
    setBalance,
    connected,
    setConnected,
    visible,
    setVisible,
    connectWallet,
    disconnectWallet,
  } = useContext(WalletContext) || {};

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        provider.on("chainChanged", handleChainChanged);
        provider.on("accountsChanged", handleAccountsChanged);
      }
    };
    init();

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [selectedAddress]);

  const handleChainChanged = (_chainId) => {
    window.location.reload();
  };

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      setSelectedAddress(null);
      setBalance(null);
      setConnected(false);
    } else if (accounts[0] !== selectedAddress) {
      setSelectedAddress(accounts[0]);
      await updateBalance(accounts[0]);
      setConnected(true);
    }
  };

  async function updateBalance(account) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  }

  return (
    <>
      <div
        className="bg-transparent sticky top-0"
        style={{
          height: "10vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: "20vh", marginRight: "10px", marginTop: "0" }}
          />
        </Link>
        <nav style={{ display: "flex", gap: "8vw" }}>
          <Link
            href="/"
            style={{
              color: router.pathname === "/" ? "#A4FF00" : "white",
              cursor: "pointer",
            }}
          >
            <p className=" hover:text-green-400 transition duration-500">
              Home
            </p>{" "}
          </Link>
          <Link
            href="/rpc"
            style={{
              color: router.pathname === "/rpc" ? "#A4FF00" : "white",
              cursor: "pointer",
            }}
          >
            <p className=" hover:text-green-400 transition duration-500">RPC</p>
          </Link>
          <Link
            href="/nft"
            style={{
              color: router.pathname === "/nft" ? "#A4FF00" : "white",
              cursor: "pointer",
            }}
          >
            <p className=" hover:text-green-400 transition duration-500">NFT</p>
          </Link>
          <Link
            href="/defi"
            style={{
              color: router.pathname === "/defi" ? "#A4FF00" : "white",
              cursor: "pointer",
            }}
          >
            {" "}
            <p className=" hover:text-green-400 transition duration-500">
              DeFi
            </p>
          </Link>
          <Link
            href="/contract"
            style={{
              color: router.pathname === "/contract" ? "#A4FF00" : "white",
              cursor: "pointer",
            }}
          >
            {" "}
            <p className=" hover:text-green-400 transition duration-500">
              Contract
            </p>
          </Link>
        </nav>

        <div className="flex mr-8 gap-4">
          {connected ? (

            <Button varint="green" style={{ color: "white" }} className="bg-transparent"><WalletOutlined />
              {balance.slice(0, 5)} SHM</Button>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-green-400 text-black hover:text-green-400 hover:bg-black border border-green-400 hover:border-green-400 transition duration-500 px-2 py-1 rounded-xl"
            >
              Connect Wallet
            </button>
          )}
          <div
            title="Wallet Info"
            open={visible}
            onCancel={() => setVisible(false)}
            footer={[
              <button
                key="back"
                onClick={disconnectWallet}
                className="bg-green-400 text-black hover:text-green-400 hover:bg-black border border-green-400  transition duration-500 px-2 py-1 rounded-xl"
              >
                Disconnect Wallet
              </button>,
            ]}
          >
            <div className="flex " direction="vertical">
              <button
                href="https://docs.shardeum.org/faucet/claim"
                target="_blank"
                className="bg-black text-green-400 hover:text-black hover:bg-green-400 border border-black transition duration-500 px-2 py-1 rounded-xl"
              >
                Claim Testnet SHM
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletHeader;
