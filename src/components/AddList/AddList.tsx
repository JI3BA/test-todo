import {IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {AddItemForm} from "../Boxes/AddItemForm/AddItemForm";


export const AddList = () => {
    return(
        <AddItemForm>
            <TextField id="outlined-basic"
                       label="ListName"
                       size='small'
                       variant="outlined"
                       sx={{
                           width: '370px'
                       }}
            />

            <IconButton color="primary" size='large'>
                <AddCircle fontSize="inherit" />
            </IconButton>
        </AddItemForm>
    )
}