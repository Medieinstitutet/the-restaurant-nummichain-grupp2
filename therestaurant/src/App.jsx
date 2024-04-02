import { ethers } from "ethers";

if (window.ethereum) {
    window.provider = new ethers.BrowserProvider(window.ethereum);
} else {
    console.error(
        "Ethers.js: Web3 provider not found. Please install a wallet with Web3 support."
    );
}

function App() {
    return <></>;
}

export default App;
