import {ITodoList} from "../models/ITodoList";
import {v1} from "uuid";

export const todolistId1 = v1();
export const todolistId2 = v1();

const todoLists = [
    {id: todolistId1, title: "What to learn"},
    {id: todolistId2, title: "What to buy"}
]

export type AddListActionType = ReturnType<typeof  addListAC>

type ActionType = AddListActionType


export const todoListReducer = (state: ITodoList[] = todoLists, action: ActionType): ITodoList[] => {
    switch (action.type) {
        case 'ADD_LIST':
            return [...state, {id: v1(), title: action.title}]
        default:
            return state
    }
}

export const addListAC = (title: string) => {
    return { type: 'ADD_LIST', title} as const
}