import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TodoItemData {
    id : number,
    done: boolean,
    title: string
}

export interface TodoState {
    todoList : TodoItemData[]
}

const initialState : TodoState = {
    todoList : [
        {id:1, title: "First Todo", done: false},
        {id:2, title: "Second Todo", done: false}
    ]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers : {
        addTodo: (state, action : PayloadAction<TodoItemData>) => {
            state.todoList.push(action.payload)
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            const index = state.todoList.findIndex((todo) => todo.id === action.payload)
            if(index > -1) {
                state.todoList.splice(index, 1)
            }
        },
        editTodo: (state, action: PayloadAction<TodoItemData>) => {
            const index = state.todoList.findIndex((todo) => todo.id === action.payload.id)
            if(index > -1) {
                state.todoList[index]= action.payload
            }
        },
        switchDone: (state, action: PayloadAction<number>) => {
            const index = state.todoList.findIndex((todo) => todo.id === action.payload)
            if(index > -1) {
                state.todoList[index].done = !state.todoList[index].done
            }
        }
    }
})

export const { addTodo, editTodo, removeTodo, switchDone} = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todoList;

export default todoSlice.reducer;