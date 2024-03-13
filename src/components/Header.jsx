import Link from "next/link";
import { ethers } from "ethers";
import { Layout, Button, Modal, Space, Typography } from "antd";
import { useContext, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { WalletOutlined } from "@ant-design/icons";
import { WalletContext } from "@/context/WalletContext";
import { useRouter } from "next/navigation";
const { Header } = Layout;

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
        className="bg-transparent"
        style={{
          height: "10vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/">

          <img src="/logo.png" alt="Logo" style={{ height: '25vh', marginRight: '15px', marginTop: '0' }} />

        </Link>
        <nav style={{ display: "flex", gap: "8vw" }}>
          <Link
            href="/"
            style={{
              color: router.pathname === "/" ? "#A4FF00" : "white",
              cursor: "pointer",
            }}
          >
            Home
          </Link>
          <Link
            href="/rpc"
            style={{
              color: router.pathname === "/rpc" ? "#A4FF00" : "white",
              cursor: "pointer",
            }}
          >
            RPC
          </Link>
          <Link
            href="/nft"
            style={{
              color: router.pathname === "/nft" ? "#A4FF00" : "white",
              cursor: "pointer",
            }}
          >
            NFT
          </Link>
          <Link
            href="/defi"
            style={{
              color: router.pathname === "/defi" ? "#A4FF00" : "white",
              cursor: "pointer",
            }}
          >
            {" "}
            DeFi{" "}
          </Link>
          <Link
            href="/contract"
            style={{
              color: router.pathname === "/contract" ? "#A4FF00" : "white",
              cursor: "pointer",
            }}
          >
            {" "}
            Contract{" "}
          </Link>
        </nav>
        {connected ? (
          <div direction="horizontal" align="center">

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', marginRight: '5px' }}>
              <div style={{ color: 'white', marginBottom: '5px' }}>
                {selectedAddress.slice(0, 6) + "..." + selectedAddress.slice(-4)}
              </div>
              <div style={{ color: 'white' }}>
                {balance.slice(0, 5)} SHM

              </div>
              <div style={{ color: "white" }}>{balance.slice(0, 5)} SHM</div>
            </div>
            <Button
              type="primary"
              shape="circle"
              icon={<WalletOutlined />}
              onClick={() => setVisible(true)}
            />
          </div>
        ) : (
          <Button type="primary" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
        <div
          title="Wallet Info"
          open={visible}
          onCancel={() => setVisible(false)}
          footer={[
            <Button key="back" onClick={disconnectWallet}>
              Disconnect Wallet
            </Button>,
          ]}
        >

          <div className='flex ' direction="vertical">
            {/* <p className='text-white'>Address: {selectedAddress}</p>
            <p className='text-white'>Balance: {balance} SHM</p> */}
            <Button href="https://docs.shardeum.org/faucet/claim" target="_blank">Claim Testnet SHM</Button>

          </div>
        </div>
      </div>
    </>
  );
};

export default WalletHeader;
