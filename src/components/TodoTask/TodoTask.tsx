import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {ChangeEvent, FC} from "react";
import {TaskType} from "../../store/tasksReducer";

type TodoTask = {
    task: TaskType,
    removeTask: (taskId: number) => void,
}

export const TodoTask: FC<TodoTask> = ({task, removeTask}) => {
    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;

    }
    const onTitleChangeHandler = (newValue: string) => {

    }


    return(
        <div className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.task} onChange={onTitleChangeHandler} />
            <IconButton>
                <Delete />
            </IconButton>
        </div>
    )
}