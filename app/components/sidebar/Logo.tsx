import Image from 'next/image'
import { useContext } from 'react';
import { ThemeContext } from '../context/FormContext';

const Logo: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
    const { theme } = useContext(ThemeContext);

    let logoSrc;

    if (theme === 'dark') {
        logoSrc = isMobile ? "/assets/logo-mobile.svg" : "/assets/logo-light.svg";
    } else {
        logoSrc = isMobile ? "/assets/logo-mobile.svg" : "/assets/logo-dark.svg";
    }

    return (
        <picture>
            <Image src={logoSrc} width={isMobile ? 40 : 200} height={isMobile ? 40 : 200} alt="Logo" />
        </picture>
    )
}

export default Logo;
