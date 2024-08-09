import * as api from '../api'
import { start, end, error, getContactUsersReducer, formSubmitReducer, } from '../reducers/contact'
 
export const getContactUsers = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getContactUsers()
        dispatch(getContactUsersReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const formSubmit = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.formSubmit()
        dispatch(formSubmitReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}