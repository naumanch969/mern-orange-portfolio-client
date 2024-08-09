import * as api from '../api'
import { start, end, error, getCardsReducer, createCardReducer, updateCardReducer, deleteCardReducer, } from '../reducers/freelancing'


export const getCards = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getCards()
        dispatch(getCardsReducer(data.result))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const createCard = (cardData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createCard(cardData)
        dispatch(createCardReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const updateCard = (cardId,cardData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateCard(cardId, cardData)
        dispatch(updateCardReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteCard = (cardId, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteCard(cardId)
        dispatch(deleteCardReducer(data.result))
        dispatch(end())
        setOpen(false)
    } catch (err) {
        dispatch(error(err.message))
    }
}