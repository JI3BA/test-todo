import {ITodoList} from "../models/ITodoList";
import {v1} from "uuid";

export const todolistId1 = v1();
export const todolistId2 = v1();

const todoLists = [
    {id: todolistId1, title: "What to learn"},
    {id: todolistId2, title: "What to buy"}
]

export type AddListActionType = ReturnType<typeof  addListAC>
export type RemoveListActionType = ReturnType<typeof  removeListAC>

type ActionType = AddListActionType | RemoveListActionType


export const todoListReducer = (state: ITodoList[] = todoLists, action: ActionType): ITodoList[] => {
    switch (action.type) {
        case 'ADD_LIST':
            return [...state, {id: action.todoListId, title: action.title}]
        case 'REMOVE_LIST':
            return [...state.filter(tl => tl.id !== action.todoListId)]

        default:
            return state
    }
}

export const addListAC = (todoListId: string, title: string) => {
    return { type: 'ADD_LIST',todoListId, title} as const
}
export const removeListAC = (todoListId: string) => {
    return { type: 'REMOVE_LIST',todoListId} as const
}