import React from 'react';
import BoardItem from '../sidebar/BoardItem';
import { Board } from '../../types/Board';
import { Skeleton } from "@/components/ui/skeleton"
 

interface BoardListProps {
    boards: Board[];
    onBoardClick: (board: any) => void;
}

const BoardList: React.FC<BoardListProps> = ({ boards, onBoardClick }) => {
   

    if (!Array.isArray(boards)) {
        
        return (
            <ul className=' list-none  list-image-none	 flex flex-col gap-3 justify-center items-start font-bold'>
                <Skeleton className="w-60 h-[20px] rounded-full" />

            </ul>
        )
    }
    return(
        <ul className='flex  list-image-none	list-none flex-col gap-3 justify-center items-start font-bold'>
            {boards.map((board, index) => (
                <BoardItem key={index} board={board} onClick={onBoardClick} />
            ))}
        </ul>
    )
};

export default BoardList;
