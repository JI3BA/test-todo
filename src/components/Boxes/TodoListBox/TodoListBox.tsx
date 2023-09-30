import Box from "@mui/material/Box";
import {FC, ReactNode} from "react";

type TodoListBoxType = {
    children: ReactNode
}


export const TodoListBox: FC<TodoListBoxType> = ({children}) => {
    return(
        <Box sx={{ width: '450px', display: 'flex', justifyContent: 'center'}}>
            {children}
        </Box>
    )
}