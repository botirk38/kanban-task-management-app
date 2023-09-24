import Image from 'next/image'

const Logo: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
    return(
        <picture>
        <Image src={isMobile ? "/assets/logo-mobile.svg" : "/assets/logo-dark.svg"} width={isMobile ? 40 : 200} height={isMobile ? 40 : 200} alt="Logo" />
        </picture>
    )

}

export default Logo;