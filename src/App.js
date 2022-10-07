import './App.css';
import { Header } from './Components/Header'
import { ToDoForm } from './Components/ToDoForm';
import { ToDoList } from './Components/ToDoList';
import { useEffect, useState } from 'react';
import {v1} from 'uuid';




function App() {

  let [toDoList, setToDoList] = useState([]);
  
    
  // const filterToDos = (status, id) => {
  //   setFilter(status)
  //   let newFilterList = filter === 'complete' 
  //   ? toDoList.map(list => list.id === id  ? ({...list, toDos: list.toDos.filter((item) => item.complete === true)}) : list)
  //   : filter === 'active' 
  //   ? toDoList.map(list => list.id === id  ? ({...list, toDos: list.toDos.filter((item) => item.complete === false)}) : list)
  //   : toDoList;
  // }
  
  
  useEffect(() => {
    let newList = JSON.parse(localStorage.getItem("toDoList"));
    if (newList){
      setToDoList(newList);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]);

  
  const addNewList = (e) => {
    e.preventDefault();
    let newList = {
      id: v1(),
      title: e.target.task.value,
      toDos: [],
      complete: false
    }
    setToDoList([...toDoList, newList]);
  }

  const addToDo = (e, listId) => {
    e.preventDefault();
    setToDoList(
    toDoList.map((list) =>  list.id === listId  ? {...list, toDos: [...list.toDos, {id: v1(), task: e.target.toDo.value, complete: false}]} : list ) 
    );
  }

  const editList = (id, value) => {
    setToDoList(toDoList.map(list => list.id === id ? {...list, title: value} : list))
  }

  const deleteList = (e) => {
      let id = e.target.parentNode.parentNode.id;
      
      if (window.confirm("Deseas borrar esta lista")){
        setToDoList((list) => list.filter((list) => list.id !== id));
      }
      
  }

  const editTask = (e, taskId, value) => {
    let listId = e.target.parentNode.parentNode.id;
    setToDoList(toDoList.map((list) =>  
      list.id === listId  
      ? {...list, toDos: list.toDos.map((item) => 
        item.id === taskId 
        ? {...item, task: value} 
        : item) }
      : list ) 
      )
  }

  const completeTask = (e, status) => {
    let listId = e.target.parentNode.parentNode.id;
    let taskId = e.target.parentNode.id;
    setToDoList(toDoList.map((list) =>  
      list.id === listId  
      ? {...list, toDos: list.toDos.map((item) => 
        item.id === taskId 
        ? {...item, complete: status} 
        : item) }
      : list ) 
      )
  }

  const deleteTask = (e)=>{
    let listId = e.target.parentNode.parentNode.id;
    let taskId = e.target.parentNode.id;
    if (window.confirm("¿Deseas borrar esta tarea?"))
    setToDoList(toDoList.map((list) => list.id === listId ? {...list, toDos: list.toDos.filter((item) => item.id !== taskId)} : list))

  }
  
  return (
    <div className="App">
      <Header title="To do list" />
      <ToDoForm addNewList={addNewList} />
      
      {toDoList.length > 0 
      ? 
      toDoList.map((list, index)=>{
        return(
        <ToDoList 
        key={index} 
        list={list} 
        editList={editList}
        addToDo={addToDo}
        deleteList={deleteList}
        deleteTask={deleteTask}
        completeTask={completeTask}
        // filterToDos={filterToDos}
        editTask={editTask}/>
        )
      })
      :
      <p>Añade algo!</p>
      }

    </div>
  );
}

export default App;
