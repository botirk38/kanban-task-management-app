import React from 'react';
import { ButtonAddTask } from './ButtonAddTask';
import {Task} from '../types/Board';


interface EditTaskProps {
    onClose: () => void;
    task: Task;


}

const EditTask: React.FC<EditTaskProps> = ({onClose, task}) => {

    return(
        <section>
            
        </section>
    )

}

export default EditTask;