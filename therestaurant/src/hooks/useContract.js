
import { ethers } from "ethers";

import { useState, useEffect } from "react";

import { abi, contractAddress } from '../config';

const initContracts = async () => {

    const signer = await window.provider.getSigner();

    const readContract = new ethers.Contract(

        contractAddress,

        abi,

        window.provider

    );

    const writeContract = new ethers.Contract(contractAddress, abi, signer);

    return [readContract, writeContract];

};

export const useContracts = () => {

    const [readContract, setReadContract] = useState(null);

    const [writeContract, setWriteContract] = useState(null);

    useEffect(() => {

        (async () => {

            const [readContract, writeContract] = await initContracts();

            setReadContract(readContract);

            setWriteContract(writeContract);

        })();

    }, []);


    return [ readContract, writeContract ];

};