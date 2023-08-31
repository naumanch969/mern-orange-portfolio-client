import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from "../../components"
import { logout } from '../../../redux/actions/user'


const Account = () => {
    const { loggedUser, isFetching, error } = useSelector(state => state.user)

    ////////////////////////////////////////////////////  Variables  ///////////////////////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()

    ////////////////////////////////////////////////////   States   ///////////////////////////////////////////////////////

    ////////////////////////////////////////////////////   useEffect   ///////////////////////////////////////////////////////

    ////////////////////////////////////////////////////   Functions  ///////////////////////////////////////////////////////
    const logoutFunc = () => {
        dispatch(logout(navigate))
    }

    return (
        <>
            {
                isFetching
                    ?
                    <CircularProgress style={{ color: '#9feb87' }} className="w-[60px] h-[60px] text-orange " />
                    :
                    <Button onClick={logoutFunc} text="logout" color="white" background="black" />
            }
        </>
    )
}

export default Account


