import Image from "next/image";
import React from "react";

interface CreateTaskProps {
    onClose: () => void;

}


const CreateTask: React.FC<CreateTaskProps> = ({onClose}) => {

    return(
        <section className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 " onClick={onClose}>

            <div className=" dark:bg-blue-mid bg-white rounded p-8 min-h-max w-[23rem]" onClick={(e) => e.stopPropagation()}>
                <h2>Add new Task</h2>

                <div className="flex justify-start items-center mb-4">

                    <div>
                        <p>Title</p>
                        <input type="text" placeholder="e.g. Take coffee break" />
                    </div>

                    <div>
                        <p>Description</p>
                        <input type="text" placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little." />
                    </div>

                    <div>
                        <p>Subtasks</p>
                        <div>
                            <input type="text" placeholder="e.g. Make coffee" />
                            <button>
                                <Image src="/assets/icon-cross.svg" alt="delete subtask" width={10} height={10} />
                            </button>
                        </div>

                        <div>
                            <input type="text" placeholder="e.g. Drink coffee" />
                            <button>
                                <Image src="/assets/icon-cross.svg" alt="delete subtask" width={10} height={10}/>
                            </button>
                        </div>

                        <button>Add New Subtask</button>

                    </div>

                    <div>
                        <p>Status</p>
                        <select>
                        
                        </select>
                    
                    </div>

                    <button>Create Task</button> 

                </div>


            </div>

        </section>
                

    )


}

export default CreateTask;