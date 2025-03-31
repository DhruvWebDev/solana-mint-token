import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58"; // Install with: npm install bs58

const connection = new Connection(clusterApiUrl("devnet"));
const base58SecretKey = "";
const secretKey = bs58.decode(base58SecretKey);

export const payer = Keypair.fromSecretKey(secretKey);
const decimal = 6;
export const mintAuthority = payer.publicKey;
export const freezeAuthority = payer.publicKey;
async function main(){
    const tokenMint = await createMint(
        connection,
        payer,
        mintAuthority,
        freezeAuthority,
        decimal,    
      );
      console.log("tokenMint", tokenMint.toString());
}
main();