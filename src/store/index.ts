import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from './tasksReducer';
import { persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {todoListReducer} from "./todoListReducer";

const RootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export type AppRootState = ReturnType<typeof RootReducer>

export const persistor = persistStore(store)
