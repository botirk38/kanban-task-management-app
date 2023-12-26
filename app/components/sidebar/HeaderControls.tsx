import React from "react";
import Image from "next/image";
import { ButtonPrimary } from "../buttons/ButtonPrimary";

interface HeaderControlsProps {
    handleAddNewTaskClick: () => void;
    handleModalMenuClick: () => void;
}

const HeaderControls: React.FC<HeaderControlsProps> = ({handleAddNewTaskClick, handleModalMenuClick}) => {

    return(
        <div className='flex justify-center items-center '>
        <ButtonPrimary className='container w-[4rem] justify-center items-center mr-6' onClick={handleAddNewTaskClick}>
            <Image src="/assets/icon-add-task-mobile.svg" className='m-0 object-cover w-full p-1' width={10} height={10} alt="Add a task" />
        </ButtonPrimary>
        <ButtonPrimary onClick={handleModalMenuClick} className='bg-transparent'>
            <Image src="/assets/icon-vertical-ellipsis.svg" className='m-0 object-cover w-full' width={10} height={10} alt="More Info" />
        </ButtonPrimary>
    </div>
    )
}

export default HeaderControls;
