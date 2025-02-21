//Token Account
//Before you can mint tokens (issue new supply), you need a Token Account to hold the newly issued tokens.

export async function createAssociatedTokenAccount({}) {
    const tokenAccount = await createAccount(
        connection,
        payer,
        mint,
        owner,
        keypair,
      );
}

/**
 * The createAccount function returns the publicKey of the new token account. This function requires the following arguments:

    connection - the JSON-RPC connection to the cluster
    payer - the account of the payer for the transaction
    mint - the token mint that the new token account is associated with
    owner - the account of the owner of the new token account
    keypair - this is an optional parameter for specifying the new token account address. If no keypair is provided, the createAccount function defaults to a derivation from the associated mint and owner accounts.

 */