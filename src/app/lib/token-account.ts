import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { payer } from "./mint-address";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

// Before you can mint tokens, you need a Token Account to hold them.
const connection = new Connection(clusterApiUrl("devnet"));
const tokenKMintPubKey = new PublicKey("2EHUNCa6R4yfEiCGF8Zjt4fMfWLWXobDFjmU9RH9cxjd");

async function main() {
    try {
        console.log(await connection.getBalance(payer.publicKey));
        
        // Get or create an associated token account for holding your tokens
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,             // Payer for the transaction
            tokenKMintPubKey,  // Mint address of the token
            payer.publicKey    // Owner of the token account
        );

        console.log("Token Account:", tokenAccount.address.toBase58());
    } catch (error) {
        console.error("Error:", error);
    }
}

main();