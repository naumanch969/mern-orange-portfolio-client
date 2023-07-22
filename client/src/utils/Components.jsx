import { CircularProgress } from '@mui/material'



export const Error = ({ error }) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center " >
            <p className="text-[20px] text-red " >{error}</p>
        </div>
    )
}


export const Loading = ({ title, color }) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-[1rem] " >
            <CircularProgress style={{ width: '60px', height: '60px', color: color || '#ffb626' }} />
            <p className="text-[20px] text-white " >{title || 'Loading...'}</p>
        </div>
    )
}