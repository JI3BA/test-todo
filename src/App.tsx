import React from 'react';
import {TodoList} from "./components/TodoList/TodoList";
import {Provider} from "react-redux";
import {store, persistor} from "./store";
import { PersistGate } from 'redux-persist/integration/react'
import { AddList } from "./components/AddList/AddList";
import {Container} from "@mui/material";


function App() {
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
