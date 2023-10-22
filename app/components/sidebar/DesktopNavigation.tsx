import Logo from "./Logo";
import Navigation from "./Navigation";

interface DesktopNavigationProps {
    isMobile: boolean;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({isMobile}) => {

    return(
        <header className="z-50 flex flex-col justify-center items-start p-4 bg-white w-full">
            <Logo isMobile={isMobile}/>
        </header>
    )

}

export default DesktopNavigation;