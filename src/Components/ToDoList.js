import { ToDo } from './ToDo'
import { useState } from 'react';
import { FilterButton } from './FilterButton';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import IconButton from '@mui/material/IconButton';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import List from '@mui/material/List';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';


const FILTER_MAP = {
  Todas: () => true,
  Pendientes: (task) => !task.complete,
  Terminadas: (task) => task.complete
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export const ToDoList = ({ list, editList, deleteList, addToDo, deleteTask, completeTask, editTask }) => {

  const [filter, setFilter] = useState('Todas');

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  let [edit, setEdit] = useState(false);

  let [newName, setNewName] = useState(list.title)

  const showEdit = () => setEdit(!edit)

  const saveEdit = () => {
    if (newName) {
      editList(list.id, newName)
      setEdit(!edit);
      setError(false);
    } else {
      setError(true);
    }

  }

  let [newToDo, setNewToDo] = useState("");
  const [errors, setError] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    newToDo ? addToDo(newToDo, list.id) : setError(true);
    setNewToDo("")
  }

  const cancelEdit = () => {
    setEdit(!edit)
    setNewName(list.title)
}


  return (
    
      <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }} id={list.id} style={{margin: '0 auto'}}>
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center"}}> 
        {edit
          ? 
          <TextField
          label="Añadir tarea"
          variant="standard"
          name="newList"
          value={newName}
          error={errors ? true : false}
          helperText={errors ? "Introduce una tarea" : ""}
          onChange={(e) => setNewName(e.target.value)}
        />
          : 
          <h3>{list.title}</h3>
        }

        <Box>
          {edit 
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
            <IconButton edge="end" aria-label="delete" onClick={() => deleteList(list.id)} color="secondary">
              <DeleteForeverRoundedIcon />
            </IconButton>
          </>
          }

        </Box>
      </Box>

      <form onSubmit={onSubmitHandler}>
        <TextField
          label="Añadir tarea"
          variant="standard"
          name="toDo"
          value={newToDo}
          error={errors ? true : false}
          helperText={errors ? "Introduce una tarea" : ""}
          onChange={(e) => setNewToDo(e.target.value)}
        />
        <Button
          variant='outlined'
          type="submit"
        >{<AddCircleOutlineIcon />}</Button>
      </form>
      
      {list.toDos.filter(FILTER_MAP[filter]).map((toDo) => {
        return (<ToDo key={toDo.id} toDo={toDo} listId={list.id} deleteTask={deleteTask} editTask={editTask} completeTask={completeTask} />)
      })}

      {list.toDos.length > 0 ?  filterList : <p>¡Añade alguna tarea!</p>}
      </List>
  )
}



