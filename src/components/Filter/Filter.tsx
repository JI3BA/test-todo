import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {FC} from "react";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

type FilterType = {
    tags: string[],
    currentTags: string[],
    setCurrentTags: (tags: string[]) => void
}

export const Filter: FC<FilterType> = ({tags, currentTags, setCurrentTags}) => {


    const handleChange = (event: SelectChangeEvent<typeof currentTags>) => {
        const {target: { value }} = event;
        setCurrentTags(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: '450px' }} size='small'>
                <InputLabel id="demo-multiple-checkbox-label">Filtered by tags</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={currentTags}
                    onChange={handleChange}
                    input={<OutlinedInput label="Filtered by tags" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {tags.map(tag => (
                        <MenuItem key={tag} value={tag}>
                            <Checkbox checked={currentTags.indexOf(tag) > -1} />
                            <ListItemText primary={tag} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}