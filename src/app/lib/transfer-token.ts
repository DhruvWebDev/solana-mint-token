import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { payer } from "./mint-address";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"));

// Create a new wallet for the receiver
const receiverPayer = Keypair.generate();
// Request an airdrop of SOL to the receiver's wallet to pay for transaction fees
// await connection.requestAirdrop(receiverPayer.publicKey, 5000000000);

const mintPubKey = new PublicKey("2EHUNCa6R4yfEiCGF8Zjt4fMfWLWXobDFjmU9RH9cxjd");

// Define the amount to transfer
const amount = 1000000; // Adjust based on your token's decimals

async function main() {
    try {
        // Get the source token account (the sender's token account)
        const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mintPubKey,
            payer.publicKey
        );
        
        // Get or create the destination token account (the receiver's token account)
        const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer, // Payer for the transaction
            mintPubKey,
            receiverPayer.publicKey // Receiver's wallet address
        );
        
        console.log("Source Token Account:", sourceTokenAccount.address.toString());
        console.log("Destination Token Account:", destinationTokenAccount.address.toString());
        
        // Transfer tokens
        const transactionSignature = await transfer(
            connection,
            payer, // Payer for the transaction fee
            sourceTokenAccount.address, // Source token account
            destinationTokenAccount.address, // Destination token account
            payer.publicKey, // Owner of the source account
            amount // Amount to transfer
        );
        
        console.log("Transfer Transaction Signature:", transactionSignature);
        return transactionSignature;
    } catch (error) {
        console.error("Error transferring tokens:", error);
        throw error;
    }
}

// Run the transfer
(async () => {
    try {
        await main();
    } catch (error) {
        console.error("Failed to transfer tokens:", error);
    }
})();