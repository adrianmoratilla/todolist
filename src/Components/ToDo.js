import './ToDo.css'
import { useState } from 'react';

export const ToDo = ({toDo, deleteTask, completeTask, editTask}) => {

    let [edit, setEdit] = useState(false);

    let [newName, setNewName] = useState(toDo.task);

    const showEdit = () => setEdit(!edit);

    const saveEdit = (e) => {
        editTask(e, toDo.id, newName)
        setEdit(!edit);
        setNewName("");
    }

    const checkToDo = (e) => {
        let status = e.target.checked ? true : false; 
        completeTask(e, status);
    } 

    return(
        <li id={toDo.id}>
                <input type="checkbox" onChange={checkToDo} checked={toDo.complete ? true : false}/>
                
                { edit 
                ? <><input type="text" value={newName} onChange={(e) => setNewName(e.target.value)}/>
                    <button onClick={saveEdit}>Save</button>
                </>
                : <><span className={toDo.complete ? "completed" : "" } >{toDo.task}</span> 
                <button onClick={showEdit}>Edit</button></>
                }
                
                <button onClick={deleteTask}>Delete</button>
        </li>
        )
}