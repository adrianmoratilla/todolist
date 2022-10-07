import React, {createContext, useState, useContext} from 'react'
import { v1 } from "uuid"

const ToDoContext = createContext();
// export const useToDos = () => useContext(ToDoContext);

export const ToDoProvider = ({ children }) => {

    const [toDos, setToDos] = useState([])
  
    const addToDo = toDo =>
        setToDos([
            ...toDos,
            {
                id: v1(),
                toDo,
                complete: false
            }
        ])
  
    const setToDoStatus = (id, status) => {
        setToDos(toDos.map(toDo => toDo.id === id ? {...toDo, complete: status} : toDo))
    }
  
    return (
        <ToDoContext.Provider value={{ toDos, addToDo, setToDoStatus }}>
            { children }
        </ToDoContext.Provider>
    )
  }