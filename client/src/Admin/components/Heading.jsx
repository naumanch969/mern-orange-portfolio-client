import { Add, MoreVert } from '@mui/icons-material'
import { useState } from 'react'

const Heading = ({ title, setOpen }) => {

    ////////////////////////////// VARIABLES //////////////////////////////////////

    ////////////////////////////// STATES /////////////////////////////////////////
    const [showMenu, setShowMenu] = useState(false)
    ////////////////////////////// USE EFFECTS ////////////////////////////////////

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////



    return (
        <div className="relative w-full flex justify-between items-center  " >
            <div className="relative w-fit " >
                <h2 className=" text-[40px] font-bold z-10 text-white capitalize " >{title}</h2>
                <hr className="w-[80%] h-[4px] bg-orange rounded-[2px] " />
            </div>
            {
                setOpen
                    ?
                    <div className="relative  " >
                        <button onClick={() => setOpen(true)} className="w-[40px] h-[40px] bg-orange text-white rounded-full shadow-xl " ><Add /></button>
                    </div>
                    :
                    ''
            }
        </div>
    )
}

export default Heading;