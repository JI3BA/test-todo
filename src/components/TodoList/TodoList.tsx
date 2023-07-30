import {Container, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {removeTaskAC, TaskType} from "../../store/tasksReducer";
import {AppRootState} from "../../store";
import {AddItem} from "../AddItem/AddItem";
import {Filter} from "../Filter/Filter";
import {useEffect, useState, useMemo} from "react";
import {TableTasks} from "../Table/TableTasks";


export const TodoList = () => {
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks.tasks)
    const [tagsContainer, setTagsContainer] = useState<string[]>([])
    const [currentFilterTags, setCurrentFilterTags] = useState<string[]>([])
    const dispatch = useDispatch()

    const filterNote = useMemo<TaskType[]>(() => {
        if (currentFilterTags.length > 0) return tasks.filter((task) => currentFilterTags.some((tag) => task.tags.includes(tag)))
        return tasks;
    }, [tasks, currentFilterTags])

    useEffect(() => {
        const tagsFiltered: string[] = []
        tasks.reduce((tags: string[], task) => [...tags, ...task.tags], []).map(tag => !tagsFiltered.includes(tag) ? tagsFiltered.push(tag) : null)

        setTagsContainer(tagsFiltered);
    }, [tasks])

    const removeTask = (taskId: number) => {
        dispatch(removeTaskAC(taskId))
    }

    return(
            <Container fixed sx={{
                width: '470px',
                margin: '10px auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid #000000',
                borderRadius: '5px'
            }}>

                <Grid container sx={{ width: '450px', display: 'flex', justifyContent: 'center'}}>
                    <AddItem />
                </Grid>

                <Grid container sx={{ width: '450px', display: 'flex', justifyContent: 'center'}}>
                    <Filter tags={tagsContainer} currentTags={currentFilterTags} setCurrentTags={setCurrentFilterTags} />
                </Grid>

                <TableTasks filterNote={filterNote} removeTask={removeTask}/>

            </Container>
    )
}