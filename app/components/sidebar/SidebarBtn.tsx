import Image from "next/image";

interface SideBarBtnProps {
    onClick: () => void;
    className?: string;
}

const SideBarBtn: React.FC<SideBarBtnProps> = ({onClick, className}) =>{

    return(
    <button className={`w-2/3 p-4 rounded-r-3xl hover:bg-purple-dark hover:text-white flex justify-start items-center gap-4" ${className}`} onClick={onClick}>
        <Image src={"/assets/icon-hide-sidebar.svg"} alt="Hide Sidebar" width={25} height={25} />
        <p className="text-blue-grayish font-semibold"> Hide Sidebar</p>
    </button>
    );
};

export default SideBarBtn;