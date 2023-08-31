import { Person } from '@mui/icons-material'
import React, { useState } from 'react'
import { Input } from '../../components'
import { register } from '../../../redux/actions/user'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {

    //////////////////////////////////// STATES //////////////////////////////////////////
    const initialUserState = { name: '', email: '', phone: '', password: ''}
    const [userData, setUserData] = useState(initialUserState)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector(state => state.user)


    const handleRegister = () => {
        dispatch(register(userData, navigate))
    }


    return (
        <div className="flex justify-center items-center ">
            <div className="shadow-xl bg-darkGray p-[12px] rounded-[12px] overflow-hidden flex flex-col justify-between items-center gap-[1rem] w-full " >
                <div className="flex justify-center items-center w-[5rem] h-[5rem] rounded-full bg-darkGray " >
                    <Person style={{ fontSize: '4rem' }} className="text-[4rem] " />
                </div>
                <div className="flex flex-col gap-[2rem]  w-full " >
                    <Input
                        attribute="name"
                        type="text"
                        placeholder="Name..."
                        formData={userData}
                        setFormData={setUserData}
                    />
                    <Input
                        attribute="email"
                        type="email"
                        placeholder="Email..."
                        formData={userData}
                        setFormData={setUserData}
                    />
                    <Input
                        attribute="phone"
                        type="tel"
                        placeholder="Phone..."
                        formData={userData}
                        setFormData={setUserData}
                    />
                    <Input
                        attribute="password"
                        type='password'
                        placeholder="Password..."
                        formData={userData}
                        setFormData={setUserData}
                        showEyeIcon
                    />
                </div>
                <div className="flex flex-col items-center w-full gap-[2rem] " >
                    <div className="flex flex-col items-center gap-[8px] w-full " >
                        <button onClick={handleRegister} className="w-full bg-orange p-[4px] rounded-[4px] min-h-[40px] " >
                            {isFetching ? 'Submitting...' : 'Register'}
                        </button>
                        <p className="text-textGray flex justify-center items-center gap-[8px] " >
                            Already have account?
                            <Link to='/auth/login' className="underline cursor-pointer text-linkBlue  " >Login here</Link>
                        </p>
                    </div>
                </div>
                {error && <p className="text-red text-[14px] " >{error}</p>}
            </div>
        </div>
    )
}

export default Register