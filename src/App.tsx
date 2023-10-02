import React, {useState} from 'react';
import {TodoList} from "./components/TodoList/TodoList";
import {Provider} from "react-redux";
import {store, persistor} from "./store";
import { PersistGate } from 'redux-persist/integration/react'
import { AddList } from "./components/AddList/AddList";
import {Container} from "@mui/material";
import {v1} from "uuid";
import {ITodoList} from "./models/ITodoList";
import {ITasksState} from "./models/ITasks";


function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todoLists, setTodoLists] = useState<ITodoList[]>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    const [tasks, setTasks] = useState<ITasksState>({
        [todolistId1]: [
            {id: v1(), task: "HTML&CSS", isDone: true, tags: []},
            {id: v1(), task: "JS #language", isDone: true, tags: ['language']}
        ],
        [todolistId2]: [
            {id: v1(), task: "Milk and #bread", isDone: true, tags: ['bread']},
            {id: v1(), task: "React Book", isDone: true, tags: []}
        ]
    });

    return (
          <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                  <Container maxWidth="xl" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <AddList />

                      <Container sx={{display: 'flex'}}>
                          <TodoList />
                      </Container>
                  </Container>
              </PersistGate>
          </Provider>
      );
}

export default App;
