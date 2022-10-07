

export const ToDo = ({toDo, deleteTask, completeTask, editTask}) => {




    const checkToDo = (e) => {
        e.target.checked ? e.target.nextSibling.style = 'text-decoration: line-through' : e.target.nextSibling.style = "text-decoration: none"; 
        completeTask(e);
    } 

    return(
        <li id={toDo.id}>
                <input type="checkbox"  onChange={checkToDo} />
                <span>{toDo.task}</span> 
                <button onClick={editTask}>Edit</button>
                <button onClick={deleteTask}>Delete</button>
        </li>
        )
}