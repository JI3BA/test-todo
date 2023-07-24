import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow
} from "@mui/material";
import {TodoTask} from "../TodoTask/TodoTask";
import {TaskType} from "../../store/tasksReducer";
import {ChangeEvent, FC, MouseEvent, useState} from "react";
import {TablePaginationActions} from "./TablePaginationActions";

type TableTasksType = {
    filterNote: TaskType[],
    removeTask: (taskId: number) => void
}

export const TableTasks: FC<TableTasksType> = ({filterNote, removeTask}) => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const handleChangePage = (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return(
        <TableContainer sx={{ width: '450px'}}>
            <Table sx={{display: 'flex', flexDirection: 'column'}}>
                <TableBody sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    {filterNote.length
                        ? filterNote.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(task =>
                            <TableRow key={task.id} sx={{width: '100%'}}>
                                <TableCell sx={{display: 'flex', padding: '0'}}>
                                    <TodoTask task={task} removeTask={removeTask}/>
                                </TableCell>
                            </TableRow>
                        )
                        : <TableRow>
                            <TableCell sx={{fontSize: '28px', fontWeight: '700', padding: '0'}}>Notes not found</TableCell>
                        </TableRow>
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                            colSpan={3}
                            count={filterNote.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}