import { Board } from "../../types/Board";
import Image from 'next/image';

interface BoardHeaderProps {
    currentBoard: Board;
    handleMenuToggle: () => void;
    menuOpen: boolean;

}

const BoardHeader: React.FC<BoardHeaderProps> = ({ currentBoard, handleMenuToggle, menuOpen }) => {

    return(
        <div className='flex container justify-start items-center gap-2'>
            <h2 className='text-xl font-bold'>{currentBoard?.name}</h2>
            <button onClick={handleMenuToggle}>
                <Image src={`${!menuOpen ? "/assets/icon-chevron-down.svg" : "/assets/icon-chevron-up.svg"}`} alt="Open Menu" width={15} height={15} />
            </button>
        </div>

    )

}

export default BoardHeader;