import './App.css';
import { Header } from './Components/Header'
import { ToDoList } from './Components/ToDoList';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import {v1} from 'uuid';



function App() {

  let [toDoList, setToDoList] = useState([]);
  
  useEffect(() => {
    let newList = JSON.parse(localStorage.getItem("toDoList"));
    if (newList){
      setToDoList(newList);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]);

  
  const addNewList = () => {

    let newList = {
      id: v1(),
      title: "Nueva lista",
      toDos: [],
      complete: false
    }
    setToDoList([...toDoList, newList]);
  }

  const addToDo = (toDo, listId) => {
    let newTask = toDo.charAt(0).toUpperCase() + toDo.slice(1).toLowerCase()
    setToDoList(
    toDoList.map((list) =>  list.id === listId  ? {...list, toDos: [...list.toDos, {id: v1(), task: newTask, complete: false}]} : list ) 
    );
  }

  const editList = (id, value) => {
    let newTitle = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    console.log(newTitle);
    setToDoList(toDoList.map(list => list.id === id ? {...list, title: newTitle} : list))
  }

  const deleteList = (id) => {  
      if (window.confirm("Deseas borrar esta lista")){
        setToDoList((list) => list.filter((list) => list.id !== id));
      }
      
  }

  const editTask = (listId, taskId, value) => {
    let newTask = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    setToDoList(toDoList.map((list) =>  
      list.id === listId  
      ? {...list, toDos: list.toDos.map((item) => 
        item.id === taskId 
        ? {...item, task: newTask} 
        : item) }
      : list ) 
      )
  }

  const completeTask = (listId, taskId) => {
    setToDoList(toDoList.map((list) =>  
      list.id === listId  
      ? {...list, toDos: list.toDos.map((item) => 
        item.id === taskId 
        ? {...item, complete: !item.complete} 
        : item) }
      : list ) 
      )
  }

  const deleteTask = (listId, taskId)=>{
    if (window.confirm("¿Deseas borrar esta tarea?"))
    setToDoList(toDoList.map((list) => list.id === listId ? {...list, toDos: list.toDos.filter((item) => item.id !== taskId)} : list))

  }
  
  return (
    <div className="App">
      <Header title="Lista de tareas" addNewList={addNewList}/>
      
      <Grid container spacing={2}>
      {toDoList.length > 0 
      ? 
      toDoList.map((list, index)=>{
        return(
        <Grid xs={4}>
          <ToDoList 
          key={index} 
          list={list} 
          editList={editList}
          addToDo={addToDo}
          deleteList={deleteList}
          deleteTask={deleteTask}
          completeTask={completeTask}
          editTask={editTask}/>
        </Grid>
        )
      })
      :
      <h3 style={{margin: "10% auto"}}>¡Empieza tus listas de tareas!</h3>
      }
    </Grid>
    </div>
  );
}

export default App;
