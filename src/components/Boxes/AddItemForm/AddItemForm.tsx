import Box from '@mui/material/Box';
import {FC, ReactNode} from "react";

type AddItemFormType = {
    children: ReactNode
}

export const AddItemForm: FC<AddItemFormType> = ({children}) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            {children}
        </Box>
    );
}