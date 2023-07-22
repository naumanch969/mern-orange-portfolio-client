import {
    START_LOADING,
    END_LOADING,
    ERROR,


    GET_FREELANCING_CONTENT,
    CREATE_FREELANCING_FIRST_DOCUMENT,

    UPDATE_FREELANCING_HEADING,
    UPDATE_FREELANCING_DETAIL,

    BUTTON,

    ADD_FEATURE_CARD,
    UPDATE_FEATURE_CARD,
    DELETE_FEATURE_CARD,

    ADD_FREELANCING_CARD,
    UPDATE_FREELANCING_CARD_TITLE,
    UPDATE_FREELANCING_CARD_DETAIL,
    UPDATE_FREELANCING_CARD,

    ADD_SUB_FREELANCING_CARD,
    UPDATE_SUB_FREELANCING_CARD,
    DELETE_SUB_FREELANCING_CARD,

    DELETE_SECTION
} from "../../constants/admin/index"

const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const freelancingReducers = (state = initialState, action) => {

    switch (action.type) {

        case GET_FREELANCING_CONTENT: return { ...state, result: action.payload.result }
        case CREATE_FREELANCING_FIRST_DOCUMENT: return { ...state, result: action.payload.result }

        case UPDATE_FREELANCING_HEADING: return { ...state, result: { ...state.result, heading: action.payload.result } }
        case UPDATE_FREELANCING_DETAIL: return { ...state, result: { ...state.result, detail: action.payload.result } }

        case BUTTON: return { ...state, result: { ...state.result, buttons: action.payload.result } }  // action.payload.result is res.status(200).json({.....}) provided by server

        case ADD_FEATURE_CARD: return { ...state, result: { ...state.result, featureCards: action.payload.result } }
        case UPDATE_FEATURE_CARD: return { ...state, result: { ...state.result, featureCards: state.result.featureCards.map(card => card = card._id == action.payload.result._id ? action.payload.result : card) } }
        case DELETE_FEATURE_CARD: return { ...state, result: { ...state.result, featureCards: action.payload.result } }

        case ADD_FREELANCING_CARD:
        case UPDATE_FREELANCING_CARD: return { ...state, result: { ...state.result, freelancingCards: action.payload.result } }

        case UPDATE_FREELANCING_CARD_TITLE: return { ...state, result: { ...state.result, freelancingCards: state.result.freelancingCards.map(card => card.title = card._id == action.payload.result._id ? action.payload.result.title : card.title) } }

        case UPDATE_FREELANCING_CARD_DETAIL: return { ...state, result: { ...state.result, freelancingCards: state.result.freelancingCards.map(card => card.detail = card._id == action.payload.result._id ? action.payload.result.detail : card.detail) } }

        case ADD_SUB_FREELANCING_CARD: {
            let findedFreelancingCard = state.result.freelancingCards.find(card => card._id == action.payload.freelancingCardId)
            findedFreelancingCard.cards = action.payload.result
            return { ...state, result: { ...state.result, freelancingCards: [...state.result.freelancingCards] } }
        }
        case UPDATE_SUB_FREELANCING_CARD:
            let findedFreelancingCard = state.result.freelancingCards.find(card => card._id == action.payload.freelancingCardId)          // in this route we are getting both result and freelancingCardId from action.payload 
            let findedSubCard = findedFreelancingCard.cards.find(subCard => subCard._id == action.payload.subCardId)
            findedSubCard = action.payload.result
            return { ...state, result: { ...state.result, freelancingCards: [...state.result.freelancingCards] } }
        case DELETE_SUB_FREELANCING_CARD: return { ...state, result: { ...state.result, freelancingCards: [...state.result.freelancingCards] } }

        case DELETE_SECTION:
            return { ...state, result: action.payload.result }

        case START_LOADING: return { ...state, isLoading: true, isError: false }
        case END_LOADING: return { ...state, isLoading: false, isError: false }
        case ERROR: return { ...state, isError: true, error: action.payload.error }

        default:
            return state;
    }

}

export default freelancingReducers