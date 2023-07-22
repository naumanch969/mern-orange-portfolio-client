import { MoreVert } from '@mui/icons-material'
import { useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { useDispatch } from 'react-redux'

const Heading = ({ title, deleteSection, initialState, state, setState }) => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [showMenu, setShowMenu] = useState(false)
    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const deleteSectionFunc = () => {
        setState(initialState)
        dispatch(deleteSection())
        setShowMenu(false)
    }


    return (
        <div className="relative w-full flex justify-between items-center  " >
            <div className="relative w-fit " >
                <h2 className=" text-[40px] font-bold z-10 text-white capitalize " >{title}</h2>
                <hr className="w-[80%] h-[4px] bg-orange rounded-[2px] " />
            </div>
            <div className="relative  " >
                <button onClick={() => setShowMenu(pre => !pre)} className=" " ><MoreVert /></button>
                {
                    showMenu &&
                    <div className="absolute flex flex-col right-[100%] bg-darkGray rounded-[4px] p-[8px] " >
                        <button
                            onClick={deleteSectionFunc}
                            className={`w-max p-[8px] rounded-[4px] bg-darkGray hover:bg-lightGray `}
                        >Delete Section</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Heading;