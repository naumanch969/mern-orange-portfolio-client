import * as api from '../api'
import { start, end, error, getServicesReducer, createServiceReducer, updateServiceReducer, deleteServiceReducer, } from '../reducers/service'


export const getServices = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getServices()
        dispatch(getServicesReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createService = (serviceData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createService(serviceData)
        dispatch(createServiceReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateService = (serviceId, serviceData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateService(serviceId, serviceData)
        dispatch(updateServiceReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteService = (serviceId, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteService(serviceId)
        dispatch(deleteServiceReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}