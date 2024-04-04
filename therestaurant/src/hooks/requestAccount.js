import { useState, useEffect } from "react";

const initAccount = async () => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0]; // Assuming you want the first account
    } catch (error) {
        console.error("Error requesting accounts:", error);
        return null;
    }
};

export const useRequestAccount = () => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const fetchAccount = async () => {
            const acc = await initAccount();
            if (acc) {
                setAccount(acc);
            }
        };

        fetchAccount();

        return () => {
        
        };
    }, []);

    return account;
};
