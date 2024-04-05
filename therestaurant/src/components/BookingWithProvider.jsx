import { useContracts } from "../hooks/useContract";
import { useRequestAccount } from "../hooks/requestAccount";
import { useEffect } from "react";
export const BookingWithSigner = () => {
    const [readContract, writeContract] = useContracts();
    const account = useRequestAccount()
    useEffect(()=> {
        console.log(account);
        console.log(signer, provider);
    })
    return(
        <>
        <h1>Hello Signer</h1>
        </>
    )
}