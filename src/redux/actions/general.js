import * as api from '../api'
import { start, end, error, uploadImageReducer, deleteImageReducer } from '../reducers/general'

export const uploadImage = (formData) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.uploadImage(formData)
        dispatch(uploadImageReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteImage = (filename) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteImage(filename)
        dispatch(deleteImageReducer())
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}