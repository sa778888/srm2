import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'top', minHeight: '100vh', backgroundColor: '#023020', color: '#ffffff' }}>
      <div style={{ textAlign: 'center', paddingTop: '10vh', width: '100vw' }}>
        <div style={{ fontWeight: 'bold' }}>Welcome to Shardeum Dapp Boilerplate</div>
        <div style={{ fontSize: '18px' }}>Kickstart your decentralized application journey with confidence.</div>

        <div style={{ padding: '5vh 10vw', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            {/* <GlobalOutlined style={{ fontSize: '48px', color: '#40a9ff' }} /> */}
            <div style={{ fontWeight: 'bold' }}>Blockchain RPC</div>
            <div>Seamless real-time Shardeum RPC call functionalities. Dive into the vast universe of queries, transactions, and smart contracts.</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            {/* <FileImageOutlined style={{ fontSize: '48px', color: '#40a9ff' }} /> */}
            <div style={{ fontWeight: 'bold' }}>NFT Minting</div>
            <div>Mint your own NFTs from an NFT collection on the Shardeum blockchain with ease.</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            {/* <BankOutlined style={{ fontSize: '48px', color: '#40a9ff' }} /> */}
            <div style={{ fontWeight: 'bold' }}>DeFi Explorations</div>
            <div>Discover the world of DeFi by building with one of the biggest DeFi protocols in the web3 space - Uniswap.</div>
          </div>
        </div>
        <hr style={{ borderColor: '#40a9ff', margin: '20px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link href="/rpc">
            <button style={{ padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: '#40a9ff', color: '#ffffff', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Get Started</button>
          </Link>
          <Link href="https://github.com/Shardeum/shardeum-dapp-boilerplate">
            <button style={{ padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: '#40a9ff', color: '#ffffff', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Contribute</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
