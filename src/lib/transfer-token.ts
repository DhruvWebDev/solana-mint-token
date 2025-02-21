import { transfer } from "@solana/spl-token";
import { Connection, PublicKey, Signer } from "@solana/web3.js";
interface TransferToken {
    connection: Connection,
    payer: Signer,
    source: PublicKey,
    destination: PublicKey,
    owner: Signer | PublicKey,
    amount: number | bigint,
}
export async function transferToken({connection, payer, source, destination, owner, amount}:TransferToken) {
    const transactionSignature = await transfer(
        connection,
        payer,
        source,
        destination,
        owner,
        amount,
      );
}

/**
 * The transfer function returns the transaction signature of the transfer. This function requires the following arguments:
 * The transfer function returns a TransactionSignature that can be viewed on the Solana Explorer. The transfer function requires the following arguments:

    connection - the JSON-RPC connection to the cluster
    payer - the account of the payer for the transaction
    source - the token account sending tokens
    destination - the token account receiving tokens
    owner - the account of the owner of the source token account
    amount - the number of tokens to transfer
*/