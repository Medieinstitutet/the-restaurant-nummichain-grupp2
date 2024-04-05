import { ethers } from "ethers";

import { BookingComponent } from "./components/Booking";
console.log(window.ethereum);

if (window.ethereum) {
    window.provider = new ethers.BrowserProvider(window.ethereum);
} else {
    console.error(
        "Ethers.js: Web3 provider not found. Please install a wallet with Web3 support."
    );
}

function App() {
    return <>
    <BookingComponent/>
    </>;
}

export default App;
