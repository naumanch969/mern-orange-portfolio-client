import { useStateContext } from '../../../contexts/ContextProvider'
import { CircularProgress } from '@mui/material'
import { Person, VisibilityOff, RemoveRedEye } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { login, register, sendRegisterOTP, sendForgetPasswordOTP, changePassword, logout } from '../../../store/actions/user/user'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'email-validator'
import { Input } from '../../components'
import { useNavigate } from 'react-router-dom'


const Auth = () => {
    const { user, setUser, page, setPage, initialErrorObj, errorObj, setErrorObj, userFormData, setUserFormData, initialUserState, validationMessage, setValidationMessage } = useStateContext()
    const { result, isLoading, isError, error } = useSelector(state => state.people)

    ////////////////////////////////////////////////////  Variables  ///////////////////////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const registerValidated = validationMessage.name == '' && validationMessage.email == '' && validationMessage.password == '' && validationMessage.confirmPassword == ''
    const loginValidated = validationMessage.email == '' && validationMessage.password == ''
    const changePasswordValidated = validationMessage.email == '' && validationMessage.password == ''


    ////////////////////////////////////////////////////   States   ///////////////////////////////////////////////////////


    ////////////////////////////////////////////////////   useEffect   ///////////////////////////////////////////////////////
    useEffect(() => {

    }, [])

    ////////////////////////////////////////////////////   Functions  ///////////////////////////////////////////////////////

    const handleSendRegisterOTP = () => {
        if (!registerValidated) return null                 // if name || email || password || confirmPasswrd field is empty then return null
        const { email, password, confirmPassword } = userFormData
        if (password !== confirmPassword) {                 // password and confirmPassword should be same
            setErrorObj({ ...initialErrorObj, sendRegisterOTP: 'password and confirmPassword should be same' })
        }
        else {
            dispatch(sendRegisterOTP(email, setErrorObj, setPage))
        }
    }
    const handleRegister = () => {
        if (!registerValidated) return null
        const { name, email, password, phone, registerOTP } = userFormData
        const userData = { name, email, password, phone, otp: registerOTP }
        dispatch(register(userData, setPage, setErrorObj, setUserFormData))
    }
    const handleLogin = () => {
        if (!loginValidated) return null                        // if email & password fields are empty then return null
        const { email, password } = userFormData
        const userData = { email, password }
        dispatch(login(userData, navigate, setErrorObj, setUserFormData, setUser))
    }
    const handleSendForgetPasswordOTP = () => {
        const { email } = userFormData
        dispatch(sendForgetPasswordOTP(email, setPage, setErrorObj))
    }
    const handleChangePassword = () => {
        if (!changePasswordValidated) return null                 // if  email || password field is empty/unprovided then return null
        const { email, password, forgetPasswordOTP } = userFormData
        const userData = { email, password, otp: forgetPasswordOTP }
        dispatch(changePassword(userData, setPage, setErrorObj, setUserFormData))
    }
    const logoutFunc = () => {
        dispatch(logout(user?.email, navigate, setUser))
    }




    const nameBlur = () => {
        if (userFormData.name == ``) {
            setValidationMessage({ ...validationMessage, name: 'name field is required' })
        }
        else if (userFormData.name.length < 3) {
            setValidationMessage({ ...validationMessage, name: 'name must be atleast of 3 character' })
        }
        else {
            setValidationMessage({ ...validationMessage, name: '' })
        }
    }
    const emailBlur = () => {
        if (userFormData.email == ``) {
            setValidationMessage({ ...validationMessage, email: 'email field is required' })
        }
        else if (!(validator.validate(userFormData.email))) {
            setValidationMessage({ ...validationMessage, email: 'please enter valid email address' })
        }
        else {
            setValidationMessage({ ...validationMessage, email: '' })
        }
    }
    const phoneBlur = () => {
        if (userFormData.phone == ``) {
            setValidationMessage({ ...validationMessage, phone: 'phone field is required' })
        }
        else if (userFormData.phone.length !== 11) {
            setValidationMessage({ ...validationMessage, phone: 'please enter a valid phone number' })
        }
        else {
            setValidationMessage({ ...validationMessage, phone: '' })
        }
    }
    const passwordBlur = () => {
        if (userFormData.password == ``) {
            setValidationMessage({ ...validationMessage, password: 'password field is required' })
        }
        else if (userFormData.password.length < 5) {
            setValidationMessage({ ...validationMessage, password: 'password must be atleast of 5 characters' })
        }
        else {
            setValidationMessage({ ...validationMessage, password: '' })
        }
    }
    const confirmPasswordBlur = () => {
        if (userFormData.confirmPassword == ``) {
            setValidationMessage({ ...validationMessage, confirmPassword: 'confirmPassword field is required' })
        }
        else if (userFormData.confirmPassword.length < 5) {
            setValidationMessage({ ...validationMessage, confirmPassword: 'confirmPassword must be atleast of 5 character' })
        }
        else {
            setValidationMessage({ ...validationMessage, confirmPassword: '' })
        }
    }

    ////////////////////////////////////////////////////   Component   ///////////////////////////////////////////////////////


    return (

        <>
            {
                user
                    ?
                    <div className="flex flex-col justify-center items-center w-[22rem] min-h-[10rem] gap-[1rem] rounded-[4px] p-[1rem] " >
                        <button onClick={logoutFunc} className="text-white " >logout</button>
                    </div>
                    :
                    <div className="flex flex-col justify-center items-center w-[22rem] bg-lightGray gap-[1rem] rounded-[4px] p-[1rem] border-[1px] border-textGray " >


                        {
                            page == 'register' &&
                            <div className="flex flex-col justify-between items-center gap-[1rem] w-full " >
                                <div className="flex justify-center items-center w-[5rem] h-[5rem] rounded-full bg-darkGray " >
                                    <Person style={{ fontSize: '4rem' }} className="text-[4rem] " />
                                </div>
                                <div className="flex flex-col gap-[2rem]  w-full " >
                                    <Input
                                        attribute="name"
                                        type="text"
                                        placeholder="Name..."
                                        blurFunction={nameBlur}
                                        formData={userFormData}
                                        setFormData={setUserFormData}
                                        validationMessage={validationMessage}
                                    />
                                    <Input
                                        attribute="email"
                                        type="email"
                                        placeholder="Email..."
                                        blurFunction={emailBlur}
                                        formData={userFormData}
                                        setFormData={setUserFormData}
                                        validationMessage={validationMessage}
                                    />
                                    <Input
                                        attribute="phone"
                                        type="tel"
                                        placeholder="Phone..."
                                        blurFunction={phoneBlur}
                                        formData={userFormData}
                                        setFormData={setUserFormData}
                                        validationMessage={validationMessage}
                                    />
                                    <Input
                                        attribute="password"
                                        type='password'
                                        placeholder="Password..."
                                        blurFunction={passwordBlur}
                                        formData={userFormData}
                                        setFormData={setUserFormData}
                                        validationMessage={validationMessage}
                                        showEyeIcon
                                    />
                                    <Input
                                        attribute="confirmPassword"
                                        type='password'
                                        placeholder="Confirm Password..."
                                        blurFunction={confirmPasswordBlur}
                                        formData={userFormData}
                                        setFormData={setUserFormData}
                                        validationMessage={validationMessage}
                                        showEyeIcon
                                    />
                                </div>
                                <div className="flex flex-col items-center w-full gap-[2rem] " >
                                    {
                                        page == 'register' &&
                                        <div className="flex flex-col items-center gap-[8px] w-full " >
                                            <button onClick={handleSendRegisterOTP} className="w-full bg-orange p-[4px] rounded-[4px] " >
                                                {
                                                    isLoading
                                                        ?
                                                        <div className='flex justify-center items-center gap-[1rem] ' ><p className='' >Submitting...</p><CircularProgress style={{ width: '30px', height: '30px', color: '#fff' }} /></div>
                                                        :
                                                        'Register'
                                                }
                                            </button>
                                            <p className="" >Already have account. <span onClick={() => setPage('login')} className="underline cursor-pointer text-linkBlue  " >login here</span> </p>
                                        </div>
                                    }
                                </div>
                                {
                                    errorObj.sendRegisterOTP && <p className="text-red text-[14px] " >{errorObj.sendRegisterOTP}</p>
                                }
                            </div>
                        }



                        {
                            page == 'register_otp'
                            &&
                            <div className="flex flex-col justify-start gap-[1rem] w-full " >
                                <div className=" flex flex-col gap-[2rem] w-full  " >
                                    <p className="" >We have sent a verifiction code to email {userFormData.email}. Enter the code here</p>
                                    <Input
                                        attribute="registerOTP"
                                        type="text"
                                        placeholder="Verification Code"
                                        formData={userFormData}
                                        setFormData={setUserFormData}
                                        validationMessage={validationMessage}
                                    />
                                </div>
                                <div className="flex flex-col items-center w-full gap-[2rem] " >
                                    <button onClick={handleRegister} className="capitalize w-full bg-orange p-[4px] rounded-[4px] " >
                                        {
                                            isLoading
                                                ?
                                                <div className='flex justify-center items-center gap-[1rem] ' ><p className='' >Submitting...</p><CircularProgress style={{ width: '30px', height: '30px', color: '#fff' }} /></div>
                                                :
                                                'submit'
                                        }
                                    </button>
                                </div>
                                <p onClick={() => setPage('register')} className="text-linkBlue cursor-pointer " >Wrong Email?</p>
                                {
                                    errorObj.register &&
                                    <p className="text-red text-[14px] capitalize " >{errorObj.register}<span onClick={handleSendRegisterOTP} className="text-linkBlue cursor-pointer text-[16px] ml-[8px] " >Resend</span> </p>
                                }
                            </div>
                        }



                        {
                            page == 'login' &&
                            <div className="flex flex-col  justify-between items-center gap-[1rem] w-full " >
                                <div className="flex justify-center items-center w-[5rem] h-[5rem] rounded-full bg-darkGray " >
                                    <Person style={{ fontSize: '4rem' }} className="text-[4rem] " />
                                </div>
                                <div className="flex flex-col gap-[2rem]  w-full " >
                                    <Input
                                        attribute="email"
                                        type="email"
                                        placeholder="Email..."
                                        blurFunction={emailBlur}
                                        formData={userFormData}
                                        setFormData={setUserFormData}
                                        validationMessage={validationMessage}
                                    />
                                    <Input
                                        attribute="password"
                                        type={'password'}
                                        placeholder="Password..."
                                        blurFunction={passwordBlur}
                                        formData={userFormData}
                                        setFormData={setUserFormData}
                                        validationMessage={validationMessage}
                                        showEyeIcon
                                    />
                                    <p onClick={() => setPage('forget_password_email')} className="text-linkBlue cursor-pointer " >Forget Password?</p>
                                </div>
                                <div className="flex flex-col items-center w-full gap-[8px] " >
                                    <button onClick={handleLogin} className="w-full bg-orange p-[4px] rounded-[4px] " >
                                        {
                                            isLoading
                                                ?
                                                <div className='flex justify-center items-center gap-[1rem] ' ><p className='' >Submitting...</p><CircularProgress style={{ width: '30px', height: '30px', color: '#fff' }} /></div>
                                                :
                                                'login'
                                        }
                                    </button>
                                    <p className="" >Don't have account. <span onClick={() => setPage('register')} className="underline cursor-pointer text-linkBlue  " >create account</span> </p>
                                </div>
                                {
                                    errorObj.login &&
                                    <p className="text-red text-[14px] " >{errorObj.login}</p>
                                }
                            </div>
                        }




                        {
                            page == 'forget_password_email' &&
                            <div className="flex flex-col justify-start gap-[1rem] w-full ">
                                <div className=" flex flex-col gap-[2rem] w-full  " >
                                    <p className="" >Enter your registered email.</p>
                                    <Input
                                        attribute="email"
                                        type="email"
                                        placeholder="Email..."
                                        blurFunction={emailBlur}
                                        formData={userFormData}
                                        setFormData={setUserFormData}
                                        validationMessage={validationMessage}
                                    />
                                </div>
                                <div className="flex flex-col items-center w-full gap-[2rem] " >
                                    <button onClick={handleSendForgetPasswordOTP} className="capitalize w-full bg-orange p-[4px] rounded-[4px] " >
                                        {
                                            isLoading
                                                ?
                                                <div className='flex justify-center items-center gap-[1rem] ' ><p className='' >Submitting...</p><CircularProgress style={{ width: '30px', height: '30px', color: '#fff' }} /></div>
                                                :
                                                'submit'
                                        }
                                    </button>
                                </div>
                                <p onClick={() => setPage('login')} className="text-linkBlue cursor-pointer " >Go Back</p>
                                {
                                    errorObj.sendForgetPasswordOTP &&
                                    <p className="text-red text-[14px] " >{errorObj.sendForgetPasswordOTP}</p>
                                }
                            </div>
                        }



                        {
                            page == 'forget_password_otp' &&
                            <div className="flex flex-col justify-start gap-[1rem] w-full ">
                                <div className=" flex flex-col gap-[2rem] w-full  " >
                                    <p className="" >We have sent a verifiction code to email {userFormData.email}. Enter the code here</p>
                                    <Input
                                        attribute="forgetPasswordOTP"
                                        type="text"
                                        placeholder="Verification Code"
                                        formData={userFormData}
                                        setFormData={setUserFormData}
                                        validationMessage={validationMessage}
                                    />
                                    <Input
                                        attribute="password"
                                        type='password'
                                        placeholder="New Password..."
                                        blurFunction={passwordBlur}
                                        formData={userFormData}
                                        setFormData={setUserFormData}
                                        validationMessage={validationMessage}
                                        showEyeIcon
                                    />
                                </div>
                                <div className="flex flex-col items-center w-full gap-[2rem] " >
                                    <button onClick={handleChangePassword} className="capitalize w-full bg-orange p-[4px] rounded-[4px] " >
                                        {
                                            isLoading
                                                ?
                                                <div className='flex justify-center items-center gap-[1rem] ' ><p className='' >Submitting...</p><CircularProgress style={{ width: '30px', height: '30px', color: '#fff' }} /></div>
                                                :
                                                'submit'
                                        }
                                    </button>
                                </div>
                                <p onClick={() => setPage('forget_password_email')} className="text-linkBlue cursor-pointer " >Wrong Email?</p>
                                {
                                    errorObj.changePassword &&
                                    <p className="text-red text-[14px] capitalize " >{errorObj.changePassword}<span onClick={handleSendForgetPasswordOTP} className="text-linkBlue cursor-pointer text-[16px] ml-[8px] " >Resend</span> </p>
                                }
                            </div>
                        }

                    </div>

            }
        </>


    )
}

export default Auth


