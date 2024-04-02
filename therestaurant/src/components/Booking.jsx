
import { useEffect } from "react"
import {ethers} from 'ethers'

export const BookingComponent = () => { 


useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner()
    console.log(signer);
}, [])

    

    return(
        <>
       <button>18:00</button>
       <button>21:00</button>
        </>
    )
}