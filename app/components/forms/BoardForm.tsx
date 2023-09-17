import { ButtonAddTask } from "../buttons/ButtonAddTask";
import { ButtonPrimary } from "../buttons/ButtonPrimary";

interface BoardFormProps {
    title: string;
}


const BoardForm: React.FC<BoardFormProps> = ({title}) =>{
    return(
        <div className="flex flex-col dark:bg-blue-mid bg-white gap-4 rounded max-h-[calc(100vh-2rem)] overflow-y-auto p-8 w-[23rem]" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold text-lg dark:text-white">{title}</h2>
            <div className="flex flex-col justify-center items-start w-full gap-4">
                <p className="dark:text-white font-bold text-sm text-blue-grayish">Board Name</p>
                <input className="dark:bg-blue-mid p-2 rounded-md border border-blue-grayish w-full placeholder:text-sm" placeholder="e.g. Web Design"/>
            </div>

            <div className="flex flex-col justify-center items-start w-full gap-4">
                <p className="dark:text-white font-bold text-sm text-blue-grayish">Board Columns</p>
                <input className="dark:bg-blue-mid p-2 rounded-md border border-blue-grayish w-full placeholder:text-sm" placeholder="Todo"/>
                <ButtonAddTask className="dark:bg-white bg-opacity-10 text-purple-dark">+ Add new Column</ButtonAddTask>
            </div>

            <div className="flex flex-col justify-center items-center w-full">
                <ButtonPrimary className="w-full">
                    Create New  Board
                </ButtonPrimary>
            </div>
        </div>
    )
}

export default BoardForm;