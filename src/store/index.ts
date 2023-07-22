import { createStore, combineReducers } from 'redux';
import { tasksReducer } from './tasksReducer';

const RootReducer = combineReducers({
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof RootReducer>

export const store = createStore(RootReducer)