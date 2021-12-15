import React, {useState} from 'react';
import { Link } from "react-router-dom";

const TaskCheckbox = (props)  => { 
    const [checked, setChecked] = useState(props.completed); 
    
    const onChange = (e) => { 
        console.log(checked);
        setChecked(!checked);
        const url = `/api/v1/tasks/update/${props.id}`;

        const body = {
            name: props.name,
            task: props.task.replace(/\n/g, "<br> <br>"),
            due_date: props.due_date,
            category: props.category,
            completed: !checked ? '1' : '0'
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
                method: "PUT",
                headers: {
                    "X-CSRF-Token": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(error => console.log(error.message));
    };
    
    return (
        <>
            <div className="task_left align-items-center justify-content-center" >
                <input type="checkbox" onClick={(e) => onChange(e)} defaultChecked={checked} />
            </div>
            <div className="task_spacer" />
            <div className="task_left">
                <div>
                    <Link to={`/task/${props.id}`}>
                        {props.name}
                    </Link>
                </div>
                <div>
                    <p>{props.task}</p>
                </div>
                <div>
                    <p>To be completed on: {props.due_date}</p>
                </div>
            </div>
            <div className="task_spacer" />
            <div className="task_right">
                <p>{props.category}</p>
            </div>
        </>
    ); 
  
  }; 
  
  
export default TaskCheckbox;