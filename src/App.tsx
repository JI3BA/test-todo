import React from 'react';
import {TodoList} from "./components/TodoList/TodoList";
import {useSelector} from "react-redux";
import {AppRootState} from "./store";
import { AddList } from "./components/AddList/AddList";
import {Container} from "@mui/material";
import {v1} from "uuid";
import {ITodoList} from "./models/ITodoList";
import {ITasksState} from "./models/ITasks";


function App() {
    const todoLists = useSelector<AppRootState, ITodoList[]>(state => state.todoLists)
    const tasks = useSelector<AppRootState, ITasksState>(state => state.tasks)

    return (
        <Container maxWidth="xl" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <AddList />

            <Container sx={{display: 'flex'}}>
                {todoLists.map(tl => <TodoList key={v1()} todoListsId={tl.id} title={tl.title} tasks={tasks[tl.id]} />)}
            </Container>
        </Container>
      );
}

export default App;
