import React from 'react';
import Image from 'next/image';

interface CreateNewBoardProps {
    onMenuToggle: () => void;
    onCreate: () => void;
}

const CreateNewBoard: React.FC<CreateNewBoardProps> = ({ onMenuToggle, onCreate }) => (
    <li className='w-100 p-3 mb-2 font-bold'>
        <button className='flex justify-center items-center gap-3' onClick={onMenuToggle}>
            <Image src="/assets/icon-board.svg" alt="Board Icon" width={20} height={20} />
            <a onClick={onCreate} className='text-purple-dark'>+ Create new Board</a>
        </button>
    </li>
);

export default CreateNewBoard;
