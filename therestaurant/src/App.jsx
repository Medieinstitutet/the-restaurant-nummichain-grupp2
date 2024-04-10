import { ethers } from "ethers";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";


if (window.ethereum) {
    window.provider = new ethers.BrowserProvider(window.ethereum);
} else {
    console.error(
        "Ethers.js: Web3 provider not found. Please install a wallet with Web3 support."
    );
}

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
