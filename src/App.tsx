import React from 'react';
import "./App.scss";

import { Container, Grid, ThemeProvider, createTheme, CssBaseline, Typography } from '@mui/material';
import TodoItem from './components/todoItem/todoItem';
import { TodoItemData, selectTodos, removeTodo, editTodo } from './features/todo/todoSlice';
import { useSelector, useDispatch } from 'react-redux';

function App() {

  const theme = createTheme({
    palette : {
      mode: 'dark'
    }
  });

  const dispatch = useDispatch()

  const todos : TodoItemData[] = useSelector(selectTodos)
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Container maxWidth="md">
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Typography variant="h2">Todo List</Typography>
          </Grid>
          {todos.map((todo) =>
            <Grid key={todo.id} item>
              <TodoItem item={todo} onChange={(item) => dispatch(editTodo(item))} onDelete={(id) => dispatch(removeTodo(id))}/>
            </Grid>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;