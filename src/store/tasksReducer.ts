export type TaskType = {
    id: number,
    task: string,
    isDone: boolean,
    tags: string[]
}

export type TasksState = {
    tasks: TaskType[]
}

const defaultState = {
    tasks:[
        {id: 1, task: 'Hello my #name', isDone: false, tags: ['name']},
        {id: 2, task: 'Where are #you going?', isDone: true, tags: ['you']},
        {id: 3, task: 'Learn #TS and #JS', isDone: false, tags: ['TS', 'JS']}
    ]
}


export type RemoveTaskActionType = ReturnType<typeof  removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskType = ReturnType<typeof changeTaskAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | changeTaskType | changeTaskStatusType

export const tasksReducer = (state: TasksState = defaultState, action: ActionsType): TasksState => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                tasks: [{id: Date.now(), task: action.task, isDone:false, tags: []}, ...state.tasks]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                tasks: state.tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK':
            return {
                ...state,
                tasks: state.tasks.map(t => t.id === action.taskId ? {...t, task: action.task, tags: [...action.tags]} : t)
            }
        default:
            return state
    }
}


export const removeTaskAC = (taskId: number) => {
    return { type: 'REMOVE-TASK', taskId} as const
}
export const addTaskAC = (task: string) => {
    return { type: 'ADD-TASK', task} as const
}

export const changeTaskStatusAC = (taskId: number, isDone: boolean) => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone} as const
}

export const changeTaskAC = (taskId: number, task: string, tags: string[]) => {
    return { type: 'CHANGE-TASK', taskId, task, tags} as const
}