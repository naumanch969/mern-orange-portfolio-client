import { START_PORTFOLIO_LOADING, END_PORTFOLIO_LOADING, ERROR, GET_PORTFOLIO_CONTENT } from "../../constants/user/index"

const initialState = { result: [], isLoading: false, isError: false, error: '', fetchingPortfolioContent: false }


const portfolioReducers = (state = initialState, action) => {

    switch (action.type) {
        case GET_PORTFOLIO_CONTENT:
            return { ...state, result: action.payload.result }

        case START_PORTFOLIO_LOADING:
            return {
                ...state,
                isLoading: true,
                isError: false,
                fetchingPortfolioContent: true,
            }

        case END_PORTFOLIO_LOADING:
            return {
                ...state,
                isLoading: false,
                isError: false,
                fetchingPortfolioContent: false,
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

export default portfolioReducers