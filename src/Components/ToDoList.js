import { ToDo } from './ToDo'
import { useState } from 'react';
import { FilterButton } from './FilterButton';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import IconButton from '@mui/material/IconButton';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import List from '@mui/material/List';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import './ToDoList.css';

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
      setError({...errors, title: false});
    } else {
      setError({...errors, title: true});
    }

  }

  let [newToDo, setNewToDo] = useState("");
  const [errors, setError] = useState({title: false, newToDo: false});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    newToDo ? addToDo(newToDo, list.id) : setError({...errors, newToDo: true});
    setNewToDo("")
  }

  const cancelEdit = () => {
    setEdit(!edit)
    setNewName(list.title)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      saveEdit()
    }
  }


  return (
    
      <List className={'list'} id={list.id}>
      <Box className={'listTitle'}> 
        {edit
          ? 
            <TextField
              label="Editar título"
              variant="standard"
              name="newList"
              value={newName}
              error={errors.title ? true : false}
              sx={{height: '77.76px'}}
              helperText={errors.title ? "Introduce un título para la lista" : ""}
              onChange={(e) => {setNewName(e.target.value); setError({...errors, title:false})}}
              onKeyPress={handleKeyPress}
            />
          : 
          <h3>{list.title}</h3>
        }

        <Box className={'buttonContainer'}>
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

      <form onSubmit={onSubmitHandler} className={'newTask'}>
        <TextField
          sx={{width: '70%'}}
          label="Añadir tarea"
          variant="standard"
          name="toDo"
          value={newToDo}
          error={errors.newToDo ? true : false}
          helperText={errors.newToDo ? "Introduce una tarea" : ""}
          onChange={(e) => {setNewToDo(e.target.value); setError({...errors, newToDo:false})}}
        />
        <IconButton
        type="submit"
        color="primary"
        >{<AddCircleOutlineIcon />}</IconButton>
      </form>
      
      {list.toDos.filter(FILTER_MAP[filter]).map((toDo) => {
        return (<ToDo key={toDo.id} toDo={toDo} listId={list.id} deleteTask={deleteTask} editTask={editTask} completeTask={completeTask} />)
      })}

      {list.toDos.length > 0 ?  filterList : <p style={{marginTop: '8%'}}>¡Añade alguna tarea!</p>}
      </List>
  )
}



