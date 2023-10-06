import {IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {AddItemForm} from "../Boxes/AddItemForm/AddItemForm";
import {addTaskAC} from "../../store/tasksReducer";
import {FC, KeyboardEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {v1} from "uuid";

type AddItemType = {
    todoListsId: string
}

export const AddItem: FC<AddItemType> = ({todoListsId}) => {
    const [valueTask , setValueTask] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const dispatch = useDispatch()

    const addTask = () => {
        if (valueTask.trim() !== "") {
            const tagsFiltered: string[] = []
            valueTask.split(' ').filter(tag => tag.includes('#')).map(tag => !tagsFiltered.includes(tag) ? tagsFiltered.push(tag.toLowerCase()) : null)


            dispatch(addTaskAC(todoListsId, valueTask, tagsFiltered.filter((tag,index) => index === tagsFiltered.indexOf(tag))))
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
            <TextField id={v1()}
                       label="Note"
                       error={!!error}
                       onChange={event => setValueTask(event.target.value)}
                       size='small'
                       variant="outlined"
                       value={valueTask}
                       onKeyPress={onKeyPressHandler}
                       sx={{
                           width: '370px'
                       }}
            />

            <IconButton color="primary" size='large' onClick={addTask}>
                <AddCircle fontSize="inherit" />
            </IconButton>
        </AddItemForm>
    )
}