import { useEffect, useState } from "react";

export const useWallet = () => {
    const [wallet, setWallet] = useState();

    useEffect(() => {
        if (window.ethereum) {
            const handleWallet = async () => {
                const signer = await window.provider.getSigner();
                const address = await signer.getAddress();

                setWallet(address);
            };

            window.ethereum.on("accountsChanged", () => {
                handleWallet();
            });

            handleWallet();
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners("accountsChanged");
            }
        };
    }, []);

    return wallet;
};
