import { ethers } from "ethers";

export const requestAccess = async () => {
    // Check if browser has wallet integration 
    if (!window.ethereum) {
        console.log('We could not find a compatible wallet. Please install a wallet that supports Ethereum');
        return; // Return early if no wallet found
    }

    try {
        // Initialize provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Get signer
        const signer = await provider.getSigner();
        console.log('Provider:', provider);
        console.log('Signer:', signer);
        
        // Request accounts
        const accounts = await provider.send("eth_requestAccounts");
        const connectedWallet = accounts[0];
        console.log('Connected wallet:', connectedWallet);

        // Check previous permissions
        const hasWalletPermissions = await provider.send('wallet_getPermissions');
        console.log('Wallet permissions:', hasWalletPermissions);

        // Return relevant data
        return { provider, signer, accounts };
    } catch (error) {
        console.error('There was an error:', error);
    }
}
