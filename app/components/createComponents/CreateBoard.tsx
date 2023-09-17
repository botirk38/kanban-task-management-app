import React from 'react';
import BoardForm from '../forms/BoardForm';

interface CreateBoardProps {
    onClose: () => void;
}

const CreateBoard: React.FC<CreateBoardProps> = ({onClose}) => {
    return(
        <section className="fixed min-h-screen  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <BoardForm title="Create new Board" />
        </section>
    )
}

export default CreateBoard;