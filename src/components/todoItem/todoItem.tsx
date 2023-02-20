import React from 'react';
import {
  IconButton,
  Checkbox,
  Paper,
  Grid,
  TextField,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { TodoItemData } from '../../features/todo/todoSlice';
import { ThemeContext } from '@emotion/react';


export interface TodoItemProps {
  item? : TodoItemData;
  onDelete?: (id: number) => void;
  onChange: (item: TodoItemData) => void;
}

function TodoItem(props: TodoItemProps) {
  const createMode : boolean = !props.item
  const item : TodoItemData = props.item ? props.item : {id:0, done: false, title:""};

  const handleCheckboxClick = () => {
    props.onChange({...item, done:!item.done});
  };

  const handleTitleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({...item, title:event.target.value});
  };

  const handleDeleteClick = () => {
    if(props.onDelete) {
      props.onDelete(item.id);
    }
  };

  return (
    <Paper elevation={1}>
      <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
          { createMode ?
              <AddIcon sx={{ margin:1, fontSize: 30 } }/>
            :
              <Checkbox 
                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                checked={item.done} 
                disableRipple 
                onChange={handleCheckboxClick}/>
          }
          
        </Grid>
        <Grid item flexGrow={2}>
          <TextField fullWidth variant="standard" value={item.title} 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleTitleOnChange(event);
            }}/>
        </Grid>
        { props.onDelete &&
          <Grid item>
            <IconButton aria-label="delete" onClick={handleDeleteClick} disabled={createMode}><DeleteIcon /></IconButton>
          </Grid>
        }
      </Grid>
    </Paper>
  );
}

export default TodoItem;