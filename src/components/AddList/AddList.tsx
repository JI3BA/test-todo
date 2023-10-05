import {IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {AddItemForm} from "../Boxes/AddItemForm/AddItemForm";
import {useDispatch} from "react-redux";
import {addListAC} from "../../store/todoListReducer";
import {KeyboardEvent, useState} from "react";
import {v1} from "uuid";
import {addListTaskAC} from "../../store/tasksReducer";


export const AddList = () => {
    const dispatch = useDispatch()
    const [valueList , setValueList] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addList = () => {
        const todoListId = v1()
        if (valueList.trim() !== "") {
            dispatch(addListAC(todoListId, valueList))
            dispatch(addListTaskAC(todoListId))
            setValueList('')
        } else {
            setError("Title is required");
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addList()
        }
    }

    return(
        <AddItemForm>
            <TextField id="add-list"
                       label="ListName"
                       size='small'
                       value={valueList}
                       error={!!error}
                       onChange={event => setValueList(event.target.value)}
                       onKeyPress={onKeyPressHandler}
                       variant="outlined"
                       sx={{
                           width: '370px'
                       }}
            />

            <IconButton color="primary" size='large' onClick={addList}>
                <AddCircle fontSize="inherit" />
            </IconButton>
        </AddItemForm>
    )
}