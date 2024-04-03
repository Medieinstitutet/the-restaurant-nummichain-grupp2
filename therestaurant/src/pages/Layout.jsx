import { Outlet } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/layout.scss";

const isPhone = () => {
    const phonePattern =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return phonePattern.test(navigator.userAgent);
};

export const Layout = () => {
    return (
        <>
            <header>
                {isPhone() ? (
                    <>
                        <details>
                            <summary>
                                <Logo width={250} height={50} isBlack={true} />
                            </summary>
                            <Navbar />
                        </details>
                    </>
                ) : (
                    <>
                        <Logo width={250} height={50} isBlack={true} />
                        <Navbar />
                    </>
                )}
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};
