import { Logo } from "./Logo";
import {
    IconBrandInstagram,
    IconBrandFacebook,
    IconBrandX,
} from "@tabler/icons-react";

export const Footer = () => (
    <>
        <div className="footer-logo">
            <Logo width={170} height={35} isBlack={false} />
            <div className="footer-address">
                <p>245 Oak Street, Suite 200, Springfield, IL 62701</p>
                <p>Phone: (123) 456-7890</p>
            </div>
        </div>
        <div className="footer-social">
            <h4>Connect on social media</h4>
            <div className="social-icons">
                <a href="#">
                    <IconBrandFacebook size={30} />
                </a>
                <a href="#">
                    <IconBrandInstagram size={30} />
                </a>
                <a href="#">
                    <IconBrandX size={30} />
                </a>
            </div>
        </div>
    </>
);
