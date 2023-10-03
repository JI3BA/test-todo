import {ITasksState} from "../models/ITasks";
import {v1} from "uuid";
import {todolistId1, todolistId2} from "./todoListReducer";

export type RemoveTaskActionType = ReturnType<typeof  removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskType = ReturnType<typeof changeTaskAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | changeTaskType | changeTaskStatusType

const tasks = {
        [todolistId1]: [
            {id: v1(), task: "HTML&CSS", isDone: true, tags: []},
            {id: v1(), task: "JS #language", isDone: false, tags: ['language']}
        ],
        [todolistId2]: [
            {id: v1(), task: "Milk and #bread", isDone: false, tags: ['bread']},
            {id: v1(), task: "React Book", isDone: true, tags: []}
        ]
}

export const tasksReducer = (state: ITasksState = tasks, action: ActionsType): ITasksState => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), task: action.task, isDone: false, tags: [...action.tags]}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, task: action.task, tags: [...action.tags]} : t)
            }
        default:
            return state
    }
}


export const removeTaskAC = (todolistId: string, taskId: string) => {
    return { type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (todolistId: string, task: string, tags: string[]) => {
    return { type: 'ADD-TASK',todolistId, task, tags} as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return { type: 'CHANGE-TASK-STATUS',todolistId, taskId, isDone} as const
}

export const changeTaskAC = (todolistId: string, taskId: string, task: string, tags: string[]) => {
    return { type: 'CHANGE-TASK',todolistId, taskId, task, tags} as const
}