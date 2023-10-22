import { Board } from "@/app/types/Board";
import BoardList from "../menus/BoardList";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { BoardContext } from "../context/BoardContext";
import { useContext } from "react";

interface DesktopNavigationProps {
    isMobile: boolean;
    handleMenuToggle: () => void;
    handleCreateNewBoardCLick: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({isMobile, handleMenuToggle, handleCreateNewBoardCLick}) => {
    const {setCurrentBoard} = useContext(BoardContext);



    return(
        <header className="z-50 flex flex-col justify-start items-start p-4 bg-white w-full gap-20 min-h-screen">
            <Logo isMobile={isMobile}/>
            <Navigation menuOpen={true} handleMenuToggle={handleMenuToggle} handleCreateNewBoardClick={handleCreateNewBoardCLick}/>
        </header>
    )

}

export default DesktopNavigation;