import * as api from "../../api/user/user"
import Cookie from 'js-cookie'
import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_ALL_PEOPLE,
    CREATE_PEOPLE_FIRST_DOCUMENT,
    GET_ALL_SUBSCRIBERS,
    GET_ALL_ADMINS,
    SUBSCRIBE,
    UNSUBSCRIBE,
    UPDATE_MAIN_ADMIN,
    ADD_ADMIN,
    UPDATE_ADMIN,
    DELETE_ADMIN,

    FORM_SUBMIT,

    GET_ALL_USERS,
    SEND_OTP,
    CHANGE_PASSWORD,
    REGISTER,
    LOGIN,
    LOGOUT,
    DELETE_USER

} from '../../constants/user'


export const getPeopleContent = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const result = await api.getPeopleContent()
        const data = result.data
        dispatch({ type: GET_ALL_PEOPLE, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const createPeopleFirstDocument = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const result = await api.createPeopleFirstDocument()
        const data = result.data
        dispatch({ type: CREATE_PEOPLE_FIRST_DOCUMENT, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}







// main admins
export const updateMainAdmin = (name, email, phone) => async (dispatch) => {
    try {
        const { data } = await api.updateMainAdmin(name, email, phone)
        dispatch({ type: UPDATE_MAIN_ADMIN, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}



// subscribers
export const subscribe = (email) => async (dispatch) => {
    try {
        const { data } = await api.subscribe(email)
        dispatch({ type: SUBSCRIBE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const unsubscribe = (id) => async (dispatch) => {
    try {
        const { data } = await api.unsubscribe(id)
        dispatch({ type: UNSUBSCRIBE, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}



// admins
export const getAllAdmins = (backHeading) => async (dispatch) => {
    try {
        const { data } = await api.getAllAdmins(backHeading)
        dispatch({ type: GET_ALL_ADMINS, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const addAdmin = (name, email, phone) => async (dispatch) => {
    try {
        const { data } = await api.addAdmin(name, email, phone)
        dispatch({ type: ADD_ADMIN, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const updateAdmin = (adminId, name, email, phone) => async (dispatch) => {
    try {
        const { data } = await api.updateAdmin(adminId, name, email, phone)
        dispatch({ type: UPDATE_ADMIN, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}
export const deleteAdmin = (email) => async (dispatch) => {
    try {
        const { data } = await api.deleteAdmin(email)
        dispatch({ type: DELETE_ADMIN, payload: data })
    } catch (error) {
        dispatch({ type: ERROR, payload: { error } })
    }
}





// users
const initialUserState = { name: '', email: '', password: '', confirmPassword: '', registerOTP: '', forgetPasswordOTP: '' }
const initialErrorObj = { login: '', register: '', sendRegisterOTP: '', sendForgetPasswordOTP: '', changePassword: '', contact: '' }



// contact form submission
export const formSubmit = (contactFormData, setContactFormData, setErrorObj) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const result = await api.formSubmit(contactFormData)
        const data = result.data
        if (data.success) {
            dispatch({ type: FORM_SUBMIT, payload: data })
            setContactFormData(initialUserState)
            setErrorObj(initialErrorObj)
        }
        else {
            setErrorObj({ ...initialErrorObj, contact: data.message })
        }

        dispatch({ type: END_LOADING })
    } catch (error) {
        setErrorObj({ ...initialErrorObj, contact: error.response.data.message })
        dispatch({ type: END_LOADING })
    }
}






export const sendRegisterOTP = (email, setErrorObj, setPage) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const result = await api.sendRegisterOTP(email)
        const data = result.data
        if (data.success) {
            dispatch({ type: SEND_OTP, payload: data })
            setErrorObj(initialErrorObj)
            setPage('register_otp')
        }
        else {
            setErrorObj({ ...initialErrorObj, sendRegisterOTP: data.message })
        }

        dispatch({ type: END_LOADING })
    } catch (error) {
        setErrorObj({ ...initialErrorObj, sendRegisterOTP: error.response.data.message })
        dispatch({ type: END_LOADING })
    }
}
export const register = (userData, setPage, setErrorObj, setUserFormData) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING })

        const result = await api.register(userData)
        const data = result.data
        if (data.success) {
            dispatch({ type: REGISTER, payload: data })
            setPage('login')
            setErrorObj(initialErrorObj)
            navigate('/')
            setUserFormData(initialUserState)
        }
        else {
            setErrorObj({ ...initialErrorObj, register: data.message })
        }

        dispatch({ type: END_LOADING })
    } catch (error) {
        setErrorObj({ ...initialErrorObj, register: error.message })
        dispatch({ type: END_LOADING })
    }
}
export const login = (userData, navigate, setErrorObj, setUserFormData, setUser) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const result = await api.login(userData)
        const data = result.data
        if (data.success) {
            dispatch({ type: LOGIN, payload: data })
            setErrorObj(initialErrorObj)
            navigate('/')
            setUser(data.result)
            setUserFormData(initialUserState)
            Cookie.set('profile', JSON.stringify(data.result))
        }
        else {
            setErrorObj({ ...initialErrorObj, login: data.message })
        }
        dispatch({ type: END_LOADING })
    } catch (error) {
        setErrorObj({ ...initialErrorObj, login: error?.response?.data?.message })
        dispatch({ type: END_LOADING })
    }
}
export const logout = (email, navigate, setUser) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const result = await api.logout(email)
        const data = result.data
        dispatch({ type: LOGOUT, payload: data })
        setUser(null)
        navigate('/')
        Cookie.remove('profile')

        dispatch({ type: END_LOADING })
    } catch (error) {
        dispatch({ type: END_LOADING })
    }
}
export const sendForgetPasswordOTP = (email, setPage, setErrorObj) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const result = await api.sendForgetPasswordOTP(email)
        const data = result.data
        if (data.success) {
            dispatch({ type: SEND_OTP, payload: data })
            setErrorObj(initialErrorObj)
            setPage('forget_password_otp')
        }
        else {
            setErrorObj({ ...initialErrorObj, sendForgetPasswordOTP: data.message })
        }

        dispatch({ type: END_LOADING })
    } catch (error) {
        setErrorObj({ ...initialErrorObj, sendForgetPasswordOTP: error.response.data.message })
        dispatch({ type: END_LOADING })
    }
}
export const changePassword = (userData, setPage, setErrorObj, setUserFormData) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const result = await api.changePassword(userData)         //email, password, otp
        const data = result.data
        if (data.success) {
            dispatch({ type: CHANGE_PASSWORD, payload: data })
            setErrorObj(initialErrorObj)
            setPage('login')
            setUserFormData(initialUserState)
        }
        else {
            setErrorObj({ ...initialErrorObj, changePassword: data.message })
        }

        dispatch({ type: END_LOADING })
    } catch (error) {
        setErrorObj({ ...initialErrorObj, changePassword: error.response.data.message })
        dispatch({ type: END_LOADING })
    }
}
export const deleteUser = (email) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const result = await api.deleteUser(email)
        const data = result.data

        dispatch({ type: DELETE_USER, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        setErrorObj({ ...initialErrorObj, changePassword: error.response.data.message })
        dispatch({ type: END_LOADING })
    }
}