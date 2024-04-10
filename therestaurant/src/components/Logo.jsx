import logoBlack from "/logo-black.svg";
import logoWhite from "/logo-white.svg";

export const Logo = ({ width, height, isBlack }) => (
    <img
        src={isBlack ? logoBlack : logoWhite}
        alt="PixelBite Logo"
        width={width}
        height={height}
    />
);
