import Box from '@mui/material/Box';
import {FC, ReactNode} from "react";

type AddItemFormType = {
    children: ReactNode
}

export const AddItemForm: FC<AddItemFormType> = ({children}) => {
    return (
        <Box
            sx={{
                width: '450px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '30px',
                p: 1,
            }}
        >
            {children}
        </Box>
    );
}