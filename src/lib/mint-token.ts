import { mintTo } from "@solana/spl-token";
import { Connection, PublicKey, Signer } from "@solana/web3.js";

interface MintToken {
    connection: Connection,
    payer: Signer,
    mint: PublicKey,
    destination: PublicKey,
    authority: Signer | PublicKey,
    amount: number | bigint,
}
export async function mintToken({connection, payer, mint, destination, authority, amount}:MintToken) {
    const transactionSignature = await mintTo(
        connection,
        payer,
        mint,
        destination,
        authority,
        amount,
      );
}

/** 
 * The mintTo function returns a TransactionSignature that can be viewed on the Solana Explorer. The mintTo function requires the following arguments:

    connection - the JSON-RPC connection to the cluster
    payer - the account of the payer for the transaction
    mint - the token mint that the new token account is associated with
    destination - the token account that tokens will be minted to
    authority - the account authorized to mint tokens
    amount - the raw amount of tokens to mint outside of decimals, e.g. if Scrooge Coin mint's decimals property was set to 2 then to get 1 full Scrooge Coin you would need to set this property to 100
*/