import React from 'react';
import {TodoList} from "./components/TodoList/TodoList";
import {Provider} from "react-redux";
import {store, persistor} from "./store";
import { PersistGate } from 'redux-persist/integration/react'
import { AddList } from "./components/AddList/AddList";


function App() {
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <div>
                  <AddList />
                  <TodoList />
              </div>
          </PersistGate>
      </Provider>
  );
}

export default App;
