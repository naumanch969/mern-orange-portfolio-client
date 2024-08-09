import { Person } from '@mui/icons-material'
import React, { useState } from 'react'
import { Input } from '../../components'
import { login } from '../../../redux/actions/user'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

    //////////////////////////////////// STATES //////////////////////////////////////////
    const initialUserState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialUserState)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector(state => state.user)


    const handleLogin = () => {
        dispatch(login(userData, navigate))
    }


    return (
        <div className="flex justify-center items-center ">
            <div className="w-[24rem] shadow-xl bg-darkGray p-[1rem] rounded-[12px] overflow-hidden flex flex-col justify-between items-center gap-[2rem] " >

                <div className="flex justify-center items-center border-[1px] border-white w-[7rem] h-[7rem] rounded-full bg-lightGray " >
                    <Person style={{ fontSize: '5rem', color: 'white' }} />
                </div>

                <div className="flex flex-col gap-[1.5rem] w-full " >
                    <Input
                        label='Email'
                        attribute="email"
                        type="email"
                        placeholder="email@example.com"
                        formData={userData}
                        setFormData={setUserData}
                    />
                    <Input
                        label='Password'
                        attribute="password"
                        type='password'
                        placeholder="Your password here"
                        formData={userData}
                        setFormData={setUserData}
                        showEyeIcon
                    />
                </div>

                <div className="flex flex-col items-center w-full gap-[2rem] " >
                    <div className="flex flex-col items-center gap-[1rem] w-full " >
                        <button onClick={handleLogin} className="w-full bg-orange p-[4px] rounded-[4px] min-h-[40px] " >
                            {isFetching ? 'Submitting...' : 'Login'}
                        </button>
                        <p className="text-textGray flex justify-center items-center gap-[8px] " >
                            Don't have account?
                            <Link to='/auth/register' className="cursor-pointer text-orange hover:underline  " >Register here</Link>
                        </p>
                    </div>
                </div>

                {error && <p className="text-red text-[14px] " >{error}</p>}

            </div>
        </div>
    )
}

export default Login