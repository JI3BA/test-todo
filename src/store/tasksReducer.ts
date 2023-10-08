import { ITasksState } from "../models/ITasks";
import { v1 } from "uuid";
import { todolistId1, todolistId2 } from "./todoListReducer";

export type RemoveTaskActionType = ReturnType<typeof  removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskType = ReturnType<typeof changeTaskAC>
export type AddListTaskType = ReturnType<typeof addListTaskAC>
export type RemoveListTaskType = ReturnType<typeof removeListTaskAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | changeTaskType | changeTaskStatusType | AddListTaskType
| RemoveListTaskType

const tasks = {
        [todolistId1]: [
            {id: v1(), task: "HTML&CSS", isDone: true, tags: []},
            {id: v1(), task: "JS #language", isDone: false, tags: ['#language']}
        ],
        [todolistId2]: [
            {id: v1(), task: "Milk and #bread", isDone: false, tags: ['#bread']},
            {id: v1(), task: "React Book", isDone: true, tags: []}
        ]
}

export const tasksReducer = (state: ITasksState = tasks, action: ActionsType): ITasksState => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListId]: [{id: v1(), task: action.task, isDone: false, tags: [...action.tags]}, ...state[action.todoListId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, task: action.task, tags: [...action.tags]} : t)
            }
        case 'ADD_LIST_TASK':
            return {
                ...state,
                [action.todoListId]: []
            }
        case 'REMOVE_LIST_TASK':
            const {[action.todoListId]: [], ...rest} = state
            return {...rest}
        default:
            return state
    }
}


export const removeTaskAC = (todoListId: string, taskId: string) => {
    return { type: 'REMOVE-TASK', todoListId, taskId} as const
}
export const addTaskAC = (todoListId: string, task: string, tags: string[]) => {
    return { type: 'ADD-TASK',todoListId, task, tags} as const
}

export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => {
    return { type: 'CHANGE-TASK-STATUS',todoListId, taskId, isDone} as const
}

export const changeTaskAC = (todoListId: string, taskId: string, task: string, tags: string[]) => {
    return { type: 'CHANGE-TASK',todoListId, taskId, task, tags} as const
}

export const addListTaskAC = (todoListId: string) => {
    return { type: 'ADD_LIST_TASK',todoListId} as const
}
export const removeListTaskAC = (todoListId: string) => {
    return { type: 'REMOVE_LIST_TASK',todoListId} as const
}