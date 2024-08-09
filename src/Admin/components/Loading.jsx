import { CircularProgress } from '@mui/material'

const Loading = ({ title }) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center " >
            <CircularProgress style={{ width: '60px', height: '60px', color: '#ffb626' }} className="text-orange  " />
            <p className="text-[20px] text-white " >{title ? title : 'Fetching Data...'}</p>
        </div>
    )
}
export default Loading;