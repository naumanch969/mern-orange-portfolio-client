import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from "../../components"
import { logout } from '../../../store/actions/user/user'

import { useStateContext } from '../../../contexts/ContextProvider'

const Account = () => {
    const { user, setUser } = useStateContext()
    const { result, isLoading, isError, error } = useSelector(state => state.people)

    ////////////////////////////////////////////////////  Variables  ///////////////////////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()

    ////////////////////////////////////////////////////   States   ///////////////////////////////////////////////////////

    ////////////////////////////////////////////////////   useEffect   ///////////////////////////////////////////////////////

    ////////////////////////////////////////////////////   Functions  ///////////////////////////////////////////////////////
    const logoutFunc = () => {
        dispatch(logout(user?.email, navigate, setUser))
    }

    return (
        <>
            {
                isLoading
                    ?
                    <CircularProgress style={{ color: '#9feb87' }} className="w-[60px] h-[60px] text-orange " />
                    :
                    <>
                        <Button onClick={logoutFunc} text="logout" color="white" background="black" />
                    </>
            }
        </>
    )
}

export default Account


