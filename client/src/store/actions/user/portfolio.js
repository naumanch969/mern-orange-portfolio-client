import * as api from "../../api/user/portfolio"
import {
    START_PORTFOLIO_LOADING,
    END_PORTFOLIO_LOADING,
    ERROR,

    GET_PORTFOLIO_CONTENT,
} from "../../constants/user/index"


export const getPortfolioContent = () => async (dispatch) => {
    try {
        dispatch({ type: START_PORTFOLIO_LOADING })

        const { data } = await api.getPortfolioContent()
        dispatch({ type: GET_PORTFOLIO_CONTENT, payload: data })

        dispatch({ type: END_PORTFOLIO_LOADING })

    } catch (error) {
        dispatch({ type: END_PORTFOLIO_LOADING })
        dispatch({ type: ERROR, payload: { error } })
    }
}
