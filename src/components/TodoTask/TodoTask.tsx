import {Checkbox, Grid, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {ChangeEvent, FC} from "react";
import {changeTaskStatusAC, changeTaskAC} from "../../store/tasksReducer";
import {useDispatch} from "react-redux";
import Box from "@mui/material/Box";
import {ITasks} from "../../models/ITasks";
import {v1} from "uuid";

type TodoTaskType = {
    todoListsId: string,
    task: ITasks,
    removeTask: (todoListId: string, taskId: string) => void,
}

export const TodoTask: FC<TodoTaskType> = ({todoListsId, task, removeTask}) => {
    const dispatch = useDispatch()
    const onClickHandler = () => removeTask(todoListsId, task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(todoListsId, task.id, newIsDoneValue))
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskAC(todoListsId, task.id, newValue, task.tags))
    }

    return(
        <>
            <Grid
                container
                direction="row"
                width='100%'
                border='1px solid gray'
                borderRadius='5px'
                margin='5px 0'
            >
                <Checkbox
                    checked={task.isDone}
                    color="primary"
                    onChange={onChangeHandler}
                />

                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    width='76%'
                    padding='10px 0'
                >
                    <EditableSpan todoListsId={todoListsId} id={task.id} value={task.task} onChange={onTitleChangeHandler} />
                    <Box component='div' sx={{display: 'flex'}}>Tags:
                        {task.tags.map((tag,index) =>
                            <Box key={index} component='span' sx={{padding: '0 3px'}}> {tag} </Box>)}
                    </Box>
                </Grid>

                <IconButton onClick={onClickHandler}>
                    <Delete />
                </IconButton>
            </Grid>
        </>
    )
}