import React from 'react';
import {TodoList} from "./components/TodoList/TodoList";
import {Provider} from "react-redux";
import {store, persistor} from "./store";
import { PersistGate } from 'redux-persist/integration/react'


function App() {
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <div className="App">
                  <TodoList />
              </div>
          </PersistGate>
      </Provider>
  );
}

export default App;
