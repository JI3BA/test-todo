export interface ITasks {
    id: string,
    task: string,
    isDone: boolean,
    tags: string[]
}

export interface ITasksState {
    [key: string] : ITasks[]
}