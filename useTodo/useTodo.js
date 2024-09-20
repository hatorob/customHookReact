import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer"


const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

const useTodo = () => {

    const [ todos, dispatchTodo ] = useReducer( todoReducer, [], init );

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleDeletedItem = (todoId) => {
        const deleteTodo = {
            type: 'Delete Todo',
            payload: todoId
        };
        dispatchTodo(deleteTodo);        
    }

    const handleNewTodo = ( todoNew ) => {
        const newTodo = {
            type: 'Add Todo',
            payload: todoNew
        }
        dispatchTodo(newTodo);
    }

    const handleDone = ( todoId ) => {
        const updateDone = {
            type: 'Update Done Todo',
            payload: todoId
        }
        dispatchTodo(updateDone)
    }

    return {
        todos, 
        handleDeletedItem, 
        handleDone, 
        handleNewTodo
    }
}

export default useTodo
