import {
    START_LOADING,
    END_LOADING,
    ERROR,

    BUTTON,
    IMAGE,
    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,
    ADD_CONTACT_CARD,
    UPDATE_CONTACT_CARD,
    DELETE_CONTACT_CARD,

    GET_CONTACT_CONTENT,
    CREATE_CONTACT_FIRST_DOCUMENT,
    UPDATE_INPUTS,


    DELETE_SECTION
} from "../../constants/admin/index"


const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const contactReducers = (state = initialState, action) => {
    switch (action.type) {

        case GET_CONTACT_CONTENT: return { ...state, result: action.payload.result }
        case CREATE_CONTACT_FIRST_DOCUMENT: return { ...state, result: action.payload.result }

        case UPDATE_FORWARD_HEADING: return { ...state, result: { ...state.result, forwardHeading: action.payload.result } }
        case UPDATE_BACK_HEADING: return { ...state, result: { ...state.result, backHeading: action.payload.result } }
        case UPDATE_DETAIL: return { ...state, result: { ...state.result, detail: action.payload.result } }

        case BUTTON: return { ...state, result: { ...state.result, buttons: action.payload.result } }
        case IMAGE: return { ...state, result: { ...state.result, images: action.payload.result } }
        case UPDATE_INPUTS: return { ...state, result: { ...state.result, inputs: action.payload.result } }

        case ADD_CONTACT_CARD: return { ...state, result: { ...state.result, cards: action.payload.result } }
        case UPDATE_CONTACT_CARD: return { ...state, result: { ...state.result, cards: state.result.cards.map(card => card = card._id == action.payload.result._id ? action.payload.result : card) } }
        case DELETE_CONTACT_CARD: return { ...state, result: { ...state.result, cards: action.payload.result } }

        case DELETE_SECTION: return { ...state, result: action.payload.result }

        case START_LOADING: return { ...state, isLoading: true, isError: false }
        case END_LOADING: return { ...state, isLoading: false, isError: false }
        case ERROR: return { ...state, isError: true, error: action.payload.error }

        default: return state;
    }

}

export default contactReducers