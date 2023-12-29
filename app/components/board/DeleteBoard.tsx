import { Board } from "../../types/Board";
import ButtonDanger from "../buttons/ButtonDanger";
import { ButtonAddTask } from "../buttons/ButtonAddTask";
import { useContext } from "react";
import { BoardsContext } from "../context/BoardsContext";
import { BoardContext } from "../context/BoardContext";

interface DeleteBoardProps {
    onClose: () => void;
}

const DeleteBoard: React.FC<DeleteBoardProps> = ({ onClose}) => {

    const { boards, setBoards, deleteBoard } = useContext(BoardsContext);
    const { currentBoard, setCurrentBoard } = useContext(BoardContext);

    const handleCancelClick = () =>{
        onClose();
    }

    const handleDeleteBoard = () =>{
        
        if (currentBoard && currentBoard.id){
            console.log(currentBoard, currentBoard?.id)
            deleteBoard(currentBoard.id)
            setCurrentBoard(boards[0]);
            console.log(currentBoard);
            onClose();
        }
    }

    return(
        <section className="fixed min-h-screen  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 " onClick={onClose}>
            <div className="flex flex-col dark:bg-blue-mid bg-white gap-4 rounded max-h-[calc(100vh-2rem)] overflow-y-auto p-8 w-[23rem]" onClick={e => e.stopPropagation()}>
                <h1 className='text-lg text-red-bright font-bold'>Delete this Task ?</h1>
                <p className='text-blue-grayish'>Are you sure you want to delete the &apos;{currentBoard?.name}&apos;
                    ? This action cannot be reversed.
                </p>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <ButtonDanger className='text-white tracking-wide' onClick={handleDeleteBoard}> Delete </ButtonDanger>
                    <ButtonAddTask className='bg-opacity-10 text-purple-dark' onClick={handleCancelClick}>Cancel</ButtonAddTask>
                </div>
            </div>
        </section>
    )

}

export default DeleteBoard;
