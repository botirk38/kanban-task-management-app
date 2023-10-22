import React from 'react';
import Image from 'next/image';
import ThemeToggle from '../buttons/ThemeToggle';

const ThemeControl: React.FC = () => (
    <div className='dark:bg-blue-dark flex justify-center items-center gap-6 bg-blue-pale p-3 rounded-lg m-5'>
        <Image src="/assets/icon-light-theme.svg" alt="Light Theme" width={25} height={25} />
        <ThemeToggle />
        <Image src="/assets/icon-dark-theme.svg" alt="Dark Theme" width={25} height={25} />
    </div>
);

export default ThemeControl;
