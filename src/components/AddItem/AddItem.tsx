import {IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {AddItemForm} from "../Boxes/AddItemForm/AddItemForm";
import {addTaskAC} from "../../store/tasksReducer";
import {KeyboardEvent, useState} from "react";
import {useDispatch} from "react-redux";


export const AddItem = () => {
    const [valueTask , setValueTask] = useState<string>('')
    let [error, setError] = useState<string | null>(null)
    const dispatch = useDispatch()

    const addTask = () => {
        if (valueTask.trim() !== "") {
            const tagsFiltered: string[] = []
            valueTask.split(' ').filter(tag => tag.includes('#')).map(tag => !tagsFiltered.includes(tag) ? tagsFiltered.push(tag) : null)


            dispatch(addTaskAC(valueTask, tagsFiltered))
            setValueTask('')
        } else {
            setError("Title is required");
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask()
        }
    }

    return(
        <AddItemForm>
            <TextField id="outlined-basic"
                       label="Note"
                       error={!!error}
                       onChange={event => setValueTask(event.target.value)}
                       size='small'
                       variant="outlined"
                       value={valueTask}
                       onKeyPress={onKeyPressHandler}
            />

            <IconButton color="primary" size='large' onClick={addTask}>
                <AddCircle fontSize="inherit" />
            </IconButton>
        </AddItemForm>
    )
}