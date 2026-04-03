"use client";
import { createThirdwebClient, getContract } from "thirdweb";
import { ConnectButton, TransactionButton, useActiveAccount } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import { claimTo } from "thirdweb/extensions/erc721";

// 1. Setup your client
const client = createThirdwebClient({ 
  clientId: "b7a6b71672e666d99f164b4edff0d7ce" 
});

export default function Home() {
  const account = useActiveAccount();

  // 2. Connect to your contract
  const contract = getContract({
    client,
    chain: baseSepolia,
    address: "YOUR_DEPLOYED_CONTRACT_ADDRESS",
  });

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px', gap: '20px' }}>
      <h1 style={{ color: '#0052FF' }}>Base NFT Minter</h1>

      <div style={{ border: '2px solid #0052FF', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
        <img src="https://via.placeholder.com/250" alt="NFT" style={{ borderRadius: '10px' }} />
        <p>Limit: 5 Per Wallet | Price: 0.00005 ETH</p>
      </div>

      {/* The Connect Button (No complex config needed!) */}
      <ConnectButton client={client} chain={baseSepolia} />

      {/* The Mint Button (Only shows if wallet is connected) */}
      {account && (
        <TransactionButton
          transaction={() => claimTo({
            contract,
            to: account.address,
            quantity: 1n,
          })}
          onTransactionConfirmed={() => alert("Minted!")}
        >
          MINT NFT
        </TransactionButton>
      )}
    </main>
  );
}