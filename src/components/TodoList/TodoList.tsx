import {Container, Grid} from "@mui/material";
import {TodoTask} from "../TodoTask/TodoTask";
import {useDispatch, useSelector} from "react-redux";
import {removeTaskAC, TaskType} from "../../store/tasksReducer";
import {AppRootState} from "../../store";
import {AddItem} from "../AddItem/AddItem";
import {Filter} from "../Filter/Filter";


export const TodoList = () => {
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks.tasks)
    const dispatch = useDispatch()

    const removeTask = (taskId: number) => {
        dispatch(removeTaskAC(taskId))
    }

    return(
            <Container fixed>
                <Grid container sx={{ width: '370px', display: 'flex', justifyContent: 'center'}}>
                    <AddItem />
                </Grid>

                <Grid container sx={{ width: '345px', display: 'flex', justifyContent: 'center'}}>
                    <Filter />
                </Grid>

                {tasks.length
                    ? tasks.map(task => <TodoTask key={task.id} task={task} removeTask={removeTask}/>)
                    : <p>Notes not found</p>
                }
            </Container>
    )
}