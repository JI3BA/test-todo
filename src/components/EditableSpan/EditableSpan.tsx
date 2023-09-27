import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import {changeTaskAC} from "../../store/tasksReducer";


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void,
    id: number
}

export const EditableSpan: FC<EditableSpanPropsType> = ({value,onChange, id}) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);
    const [error, setError] = useState<string | null>(null)
    const dispatch = useDispatch()

    const changeTask = () => {
        if (title.trim() !== "") {
            const tagsFiltered: string[] = []
            title.split(' ').filter(tag => tag.includes('#')).map(tag => !tagsFiltered.includes(tag) ? tagsFiltered.push(tag) : null)

            dispatch(changeTaskAC(id, title, tagsFiltered))
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
        : <Box component='p' sx={{ maxWidth: '100%', width: '100%', wordWrap: 'break-word' }} onDoubleClick={activateEditMode}>{value.split(' ').map((word, index) => word.includes('#') ? <Box component='span' key={index} color='green'> {word} </Box> : ` ${word} `)}</Box>
}