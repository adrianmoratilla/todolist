import {ToDo} from './ToDo'
import { useState } from 'react';

export const ToDoList = ({list, editList, deleteList, addToDo, deleteTask, completeTask, editTask}) => {

    let [edit, setEdit] = useState(false);

    let [newName, setNewName] = useState(list.title)

    const showEdit = () => setEdit(!edit)

    const saveEdit = (e) => {
        editList(list.id, e.target.previousSibling.value)
        setEdit(!edit);
        setNewName("");
    }

    return(
        <div id={list.id}>
            <h3>
            
                { edit 
                ? <><input type="text" value={newName} onChange={(e) => setNewName(e.target.value)}/>
                    <button onClick={saveEdit}>Save</button>
                </>
                : <>{list.title}
                <button onClick={showEdit}>Edit</button></>
                }
                <button onClick={deleteList}>Delete</button>
            </h3>
            <form onSubmit={(e) => {addToDo(e, list.id); setNewName("")}}>
                <input type="text" name="toDo"></input>
                <button type="submit">+</button>
            </form>

            {list.toDos.map((toDo) => {
              return (<ToDo key={toDo.id} toDo={toDo} deleteTask={deleteTask} editTask={editTask} completeTask={completeTask}/>)  
            })} 
       </div>
    )
}



