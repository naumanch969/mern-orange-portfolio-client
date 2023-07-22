import Cookie from 'js-cookie'
import {
    GET_ALL_PEOPLE,
    CREATE_PEOPLE_FIRST_DOCUMENT,
    GET_ALL_USERS,
    SEND_OTP,
    CHANGE_PASSWORD,
    REGISTER,
    LOGIN,
    LOGOUT,
    DELETE_ADMIN,
    FORM_SUBMIT,
    START_LOADING,
    END_LOADING,
    ERROR


} from "../../constants/user"

const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const userReducers = (state = initialState, action) => {

    switch (action.type) {

        case GET_ALL_PEOPLE: return { ...state, result: action.payload.result }

        case CREATE_PEOPLE_FIRST_DOCUMENT: return { ...state, result: action.payload.result }

        case GET_ALL_USERS: return { ...state, result: action.payload.result, isError: false, error: '' }

        case FORM_SUBMIT: return { ...state, result: action.payload.result, isError: false, error: '' }

        case SEND_OTP:
        case CHANGE_PASSWORD: return { ...state, isError: false, error: '' }

        case REGISTER: return { ...state, result: action.payload.result, isError: false, error: '' }

        case LOGIN: return { ...state, result: action.payload.result, isError: false, error: '' }

        case LOGOUT: return { ...state }

        case START_LOADING:
            return {
                ...state,
                isLoading: true,
                isError: false
            }

        case END_LOADING:
            return {
                ...state,
                isLoading: false,
                isError: false
            }

        case ERROR:
            return {
                ...state,
                isError: true,
                error: action.payload.error
            }

        default:
            return state;
    }

}

export default userReducers