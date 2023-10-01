export interface ITasks {
    id: number,
    task: string,
    isDone: boolean,
    tags: string[]
}

export interface ITasksState {
    [key: string] : ITasks[]
}