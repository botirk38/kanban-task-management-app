'use client'

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import {ButtonPrimary} from './ButtonPrimary';
import {Board } from '../types/Board';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
    boards: Board[];
  }

const Sidebar: React.FC<SidebarProps> = ({boards}) => {
    console.log(boards)
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const imageWidth = isMobile ? 40 : 200;
    const imageHeight = isMobile ? 40 : 200; 

    return(
        <header className='container flex gap-3 justify-start items-center p-3'>
            <picture>
                <Image 
                    src={isMobile ? "/assets/logo-mobile.svg" : "/assets/logo-dark.svg"} 
                    width={imageWidth} 
                    height={imageHeight} 
                    alt="Logo" 
                />
            </picture>

            <nav className={`transition-transform duration-500 ease-in-out transform absolute top-20 left-[4rem] shadow-xl rounded-xl min-w-max max-w-xs min-h-max  container p-6 flex-col justify-center items-start ${menuOpen ? 'translate-y-0' : '-translate-y-[50rem]'}`}>

                <h3 className='text-md tracking-widest font-bold uppercase text-blue-grayish mb-3'>
                    All Boards ({boards?.length || 0})
                </h3>

                <ul className=' flex flex-col gap-3 justify-center items-start '>
                    {boards && boards.map((board, index )=> (
                        <li key={index} className='w-100 '>
                            <button className='flex justify-center items-center gap-3'>
                                <Image src="/assets/icon-board.svg" alt="Board Icon" width={20} height={20}/>
                                <span>{board.name}</span>
                            </button>
                        </li>

                    ))}

                    <li>

                    </li>

                </ul>

                

                <div className='flex justify-center items-center gap-6 bg-blue-pale p-3 rounded-lg'>
                    <Image src="/assets/icon-light-theme.svg" alt="Light Theme" width={25} height={25}/>
                    <ThemeToggle />
                    <Image src="/assets/icon-dark-theme.svg" alt="Dark Theme" width={25} height={25}/>
                </div>
            </nav>

            <div className='flex container justify-start items-center gap-2'>
                <h2 className='text-xl font-bold'>Platform Launch</h2>
                <button><Image src="/assets/icon-chevron-down.svg" alt="Open Menu" width={15} height={15} onClick={ () => setMenuOpen(prevState => !prevState)} /> </button>
            </div>

            <ButtonPrimary className='container w-[4rem]  justify-center items-center m-0'>
                <Image src="/assets/icon-add-task-mobile.svg" className='m-0 object-cover w-full p-1' width={10} height={10} alt="Add a task"/>
            </ButtonPrimary>


            

          

            <div className='hidden'>
                <Image src="/assets/icon-hide-sidebar.svg" alt="Hide Sidebar" width={25} height={25}/>
            </div>


        </header>
    );
}

export default Sidebar;
