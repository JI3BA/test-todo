import {ITasks} from "./ITasks";

export interface ITodoList {
    id: string
    title: string,
    tasks: ITasks[]
}