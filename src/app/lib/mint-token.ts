import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
// Remove this import as it conflicts with your connection constant
// import { connection } from "next/server";
import { payer } from "./mint-address";
import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

// Minting tokens is the process of issuing new tokens into circulation.
// When you mint tokens, you increase the supply of the token mint and deposit
// the newly minted tokens into a token account.
// Only the mint authority of a token mint is allowed to mint new tokens.

const connection = new Connection(clusterApiUrl("devnet"));
const mint = new PublicKey("2EHUNCa6R4yfEiCGF8Zjt4fMfWLWXobDFjmU9RH9cxjd");
const amount = 100000000000;

async function main() {
    try {
        // First, get or create the associated token account to receive the minted tokens
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            payer.publicKey
        );
        
        // Now mint tokens to this account
        const transactionSignature = await mintTo(
            connection,
            payer,               // Payer of the transaction fee
            mint,                // Mint address
            tokenAccount.address, // Destination token account
            payer.publicKey,     // Authority (must be the mint authority)
            amount,              // Amount to mint
        );
        
        console.log("Mint transaction signature:", transactionSignature);
        return transactionSignature;
    } catch (error) {
        console.error("Error minting tokens:", error);
        throw error;
    }
}

// Move top-level await inside an async function
// (async () => {
//     try {
//         const res = await main();
//         console.log(res);
//     } catch (error) {
//         console.error("Failed to mint tokens:", error);
//     }
// })();

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
);
console.log("token Account", tokenAccount.address.toString());

// Use tokenAccount.address instead of tokenAccount
const tokenInfo = await connection.getAccountInfo(tokenAccount.address);
    