import './ToDo.css'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';

export const ToDo = ({ toDo, deleteTask, completeTask, editTask, listId }) => {


    let [newName, setNewName] = useState(toDo.task);
    let [edit, setEdit] = useState(false);
    const [errors, setError] = useState(false);

    const showEdit = () => setEdit(!edit);

    const saveEdit = () => {
        if (newName) {
            editTask(listId, toDo.id, newName)
            setEdit(!edit);
            setError(false);
        } else {
            setError(true);
        }

    }

    const checkToDo = () => {
        completeTask(listId, toDo.id);
    }

    const cancelEdit = () => {
        setEdit(!edit)
        setNewName(toDo.task)
    }

    return (

        <ListItem
            id={toDo.id}
            disablePadding
            secondaryAction={
                edit 
                ?
                <>
                <IconButton edge="end" aria-label="edit" onClick={saveEdit} color="secondary">
                    <SaveAsRoundedIcon />
                </IconButton>
                <IconButton edge="end" aria-label="cancel" onClick={cancelEdit} color="secondary">
                    <CancelRoundedIcon />
                </IconButton>
                </> 
                : 
                <>
                <IconButton edge="end" aria-label="edit" onClick={showEdit} color="secondary">
                    <BorderColorRoundedIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(listId, toDo.id)} color="secondary">
                    <DeleteForeverRoundedIcon />
                </IconButton>
                </>            
            }
        >
            <ListItemButton onClick={edit ? "none" : checkToDo} dense>

                <Checkbox
                    edge="start"
                    checked={toDo.complete ? true : false}
                    tabIndex={-1}
                    onClick={checkToDo}
                    disableRipple
                />
                {edit
                    ? 
                    <TextField
                        variant="standard"
                        name="newName"
                        value={newName}
                        error={errors ? true : false}
                        multiline
                        helperText={errors ? "Introduce una tarea válida" : ""}
                        onChange={(e) => setNewName(e.target.value)}
                           
                    />
                    :
                    <ListItemText 
                        className= {toDo.complete ? "completed" : ""} 
                        primary={toDo.task} 
                        multiline
                    />  
                }
            </ListItemButton>
        </ListItem>
    )
}

