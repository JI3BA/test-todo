import {Container, IconButton} from "@mui/material";
import {useDispatch} from "react-redux";
import {removeListTaskAC, removeTaskAC} from "../../store/tasksReducer";
import {AddItem} from "../AddItem/AddItem";
import {Filter} from "../Filter/Filter";
import {useEffect, useState, useMemo, FC} from "react";
import {TableTasks} from "../Table/TableTasks";
import {TodoListBox} from "../Boxes/TodoListBox/TodoListBox";
import {ITasks} from "../../models/ITasks";
import Box from "@mui/material/Box";
import {Delete} from "@mui/icons-material";
import {removeListAC} from "../../store/todoListReducer";

type TodoListType = {
    todoListsId: string,
    title: string,
    tasks: ITasks[]
}

export const TodoList: FC<TodoListType> = ({todoListsId, title, tasks}) => {
    const [tagsContainer, setTagsContainer] = useState<string[]>([])
    const [currentFilterTags, setCurrentFilterTags] = useState<string[]>([])
    const dispatch = useDispatch()

    const filterNote = useMemo<ITasks[]>(() => {
        if (currentFilterTags.length > 0) return tasks.filter((task) => currentFilterTags.some((tag) => task.tags.includes(tag)))
        return tasks;
    }, [tasks, currentFilterTags])

    useEffect(() => {
        const tagsFiltered: string[] = []
        tasks.reduce((tags: string[], task) => [...tags, ...task.tags], []).map(tag => !tagsFiltered.includes(tag) ? tagsFiltered.push(tag) : null)

        setTagsContainer(tagsFiltered);
    }, [tasks])

    const removeTask = (todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }

    const onClickHandler = () => {
        dispatch(removeListAC(todoListsId))
        dispatch(removeListTaskAC(todoListsId))
    }

    return(
            <Container fixed sx={{
                width: '470px',
                height: '100%',
                margin: '10px auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid #000000',
                borderRadius: '5px'
            }}>

                <TodoListBox>
                    <Box component='h1' sx={{wordBreak: 'break-word', textAlign: 'center'}}>{title}</Box>
                    <IconButton onClick={onClickHandler}>
                        <Delete />
                    </IconButton>
                </TodoListBox>

                <TodoListBox>
                    <AddItem todoListsId={todoListsId} />
                </TodoListBox>

                <TodoListBox>
                    <Filter tags={tagsContainer} currentTags={currentFilterTags} setCurrentTags={setCurrentFilterTags} />
                </TodoListBox>

                <TableTasks filterNote={filterNote} todoListsId={todoListsId} removeTask={removeTask}/>

            </Container>
    )
}