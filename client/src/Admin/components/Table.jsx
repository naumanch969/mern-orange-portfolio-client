import { Search } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const Table = ({ columns, rows, isFetching, error, rowsPerPage }) => {

    //////////////////////////////////////// VARIABLES ///////////////////////////////////

    //////////////////////////////////////// STATES ///////////////////////////////////
    const [searchValue, setSearchValue] = useState('')

    //////////////////////////////////////// FUNCTIONS ///////////////////////////////////



    return (
        <div className='thinScrollbar w-full h-auto verflow-x-scroll '>

            {
                isFetching
                &&
                <div className="w-full h-[11rem] flex justify-center items-center ">
                    <CircularProgress />
                </div>
            }
            {
                error
                &&
                <div className="w-full h-[11rem] flex justify-center items-center ">
                    <span className='text-red-500 ' >{error}</span>
                </div>
            }
            {
                (!isFetching && !error) &&
                <DataGrid
                    className='bg-white rounded-[6px] p-[5px] '
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: rowsPerPage, }
                        },
                    }}
                    getRowId={row => row._id}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            }
        </div>
    );
}

export default Table