import Cookies from 'js-cookie'
import * as api from '../api'
import { start, end, error, registerReducer, loginReducer, logoutReducer, getUsersReducer, } from '../reducers/user'


export const register = (userData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.register(userData)
        dispatch(registerReducer(data.result))
        navigate('/auth/login')
        dispatch(end())
    }
    catch (err) {
        dispatch(error(err.message))
    }
}
export const login = (userData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.login(userData)
        dispatch(loginReducer(data.result))
        navigate('/')
        dispatch(end())
    }
    catch (err) {
        dispatch(error(err.message))
    }
}
export const logout = () => async (dispatch) => {
    try {
        dispatch(start())
        dispatch(logoutReducer())
        Cookies.remove('iamnauman_profile')
        dispatch(end())
    }
    catch (err) {
        dispatch(error(err.message))
    }
}
export const getUsers = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUsers()
        dispatch(getUsersReducer(data.result))
        dispatch(end())
    }
    catch (err) {
        dispatch(error(err.message))
    }
} 