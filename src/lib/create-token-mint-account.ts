//To create a new SPL Token you first have to create a Token Mint. A Token Mint is an account that holds data about a specific token

import { createMint } from "@solana/spl-token";
import { Connection, PublicKey, Signer } from "@solana/web3.js";

interface CreateTokenMint {
    connection: Connection,
    payer: Signer,
    mintAuthority: PublicKey,
    freezeAuthority: PublicKey | null,
    decimals: number
}

export async function createTokenMint({connection, payer, mintAuthority, freezeAuthority, decimals}: CreateTokenMint) {
    const tokenMint = await createMint(
        connection,
        payer,
        mintAuthority,
        freezeAuthority,
        decimals,
      );

}

//The createMint function returns the publicKey of the new token mint. This function requires the following arguments:
/**
 * 
    connection - the JSON-RPC connection to the cluster
    payer - the public key of the payer for the transaction
    mintAuthority - the account that is authorized to do the actual minting of tokens from the token mint.
    freezeAuthority - an account authorized to freeze the tokens in a token account. If freezing is not a desired attribute, the parameter can be set to null
    decimals - specifies the desired decimal precision of the token

 */