import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { changeTaskAC } from "../../store/tasksReducer";
import { Fade, Tooltip } from "@mui/material";

type EditableSpanPropsType = {
    todoListsId: string,
    value: string
    onChange: (newValue: string) => void,
    id: string
}

export const EditableSpan: FC<EditableSpanPropsType> = ({todoListsId, value,onChange, id}) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);
    const [error, setError] = useState<string | null>(null)
    const dispatch = useDispatch()

    const changeTask = () => {
        if (title.trim() !== "") {
            const tagsFiltered: string[] = []
            title.split(' ').filter(tag => tag.includes('#')).map(tag => !tagsFiltered.includes(tag) ? tagsFiltered.push(tag) : null)


            dispatch(changeTaskAC(todoListsId, id, title, tagsFiltered))
            setTitle('')
        } else {
            setError("Title is required");
        }
    }

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
        changeTask()
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            setEditMode(false);
            onChange(title);
            changeTask()
        }
    }

    return editMode
        ? <TextField variant="outlined"
                     value={title} error={!!error} onChange={changeTitle} autoFocus onBlur={activateViewMode} onKeyPress={onKeyPressHandler} />
        : <Tooltip title="Double click to edit" aria-label="add" arrow placement="top-start" TransitionComponent={Fade} TransitionProps={{ timeout: 400 }}>
            <Box component='p' sx={{ maxWidth: '100%', width: '100%', wordWrap: 'break-word', cursor: 'pointer'}} onDoubleClick={activateEditMode}>{value.split(' ').map((word, index) => word.includes('#') ? <Box component='span' key={index} sx={{color: 'green', fontWeight: '600'}}> {word} </Box> : ` ${word} `)}
            </Box>
          </Tooltip>
}