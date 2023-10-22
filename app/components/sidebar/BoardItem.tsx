import React from 'react';
import Image from 'next/image';

interface BoardItemProps {
    board: { name: string };
    onClick: (board: any) => void;
}

const BoardItem: React.FC<BoardItemProps> = ({ board, onClick }) => (
    <li className='w-full rounded-r-3xl hover:bg-purple-dark hover:text-white'>
        <button className='flex justify-center p-3 items-center gap-3' onClick={() => onClick(board)}>
            <Image src="/assets/icon-board.svg" alt="Board Icon" width={20} height={20} />
            <span>{board.name}</span>
        </button>
    </li>
);

export default BoardItem;
