import React from 'react';
import BoardItem from '../sidebar/BoardItem';
import { Board } from '../../types/Board';
 

interface BoardListProps {
    boards: Board[];
    onBoardClick: (board: any) => void;
}

const BoardList: React.FC<BoardListProps> = ({ boards, onBoardClick }) => (
    <ul className='flex flex-col gap-3 justify-center items-start font-bold'>
        
        {boards?.map((board, index) => (
            <BoardItem key={index} board={board} onClick={onBoardClick} />
        ))}
    </ul>
);

export default BoardList;
