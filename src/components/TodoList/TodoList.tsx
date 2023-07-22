import {Container, IconButton, TextField} from "@mui/material";
import {BoxSx} from "../Boxes/BoxSx/BoxSx";
import {AddCircle} from "@mui/icons-material";
import {TodoTask} from "../TodoTask/TodoTask";
import {useDispatch, useSelector} from "react-redux";
import {NotesState, removeTaskAC} from "../../store/tasksReducer";


export const TodoList = () => {
    const tasks = useSelector<NotesState, NotesState['tasks']>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (taskId: number) => {
        dispatch(removeTaskAC(taskId))
    }

    return(
        <>
            <Container maxWidth="sm">
                <BoxSx>
                    <TextField id="outlined-basic" label="Note" size='small' variant="outlined" />
                    <IconButton color="primary" size='large'>
                        <AddCircle fontSize="inherit" />
                    </IconButton>
                </BoxSx>

                <BoxSx>
                    {tasks.map(task => <TodoTask key={task.id} task={task} removeTask={() => removeTask(task.id)}/>)}
                </BoxSx>
            </Container>
        </>
    )
}