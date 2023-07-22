import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_HOME_CONTENT,
    CREATE_HOME_FIRST_DOCUMENT,

    UPDATE_HELLO_TEXT,
    UPDATE_HEADING_1,
    UPDATE_HEADING_2,
    UPDATE_SUB_HEADING_1,
    IMAGE,
    BUTTON,

    DELETE_SECTION
} from "../../constants/admin/index"


const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const homeReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_HOME_CONTENT: return { ...state, result: action.payload.result }
        case CREATE_HOME_FIRST_DOCUMENT: return { ...state, result: action.payload.result }

        case UPDATE_HELLO_TEXT: return { ...state, result: { ...state.result, helloText: action.payload.result } }
        case UPDATE_HEADING_1: return { ...state, result: { ...state.result, heading1: action.payload.result } }
        case UPDATE_HEADING_2: return { ...state, result: { ...state.result, heading2: action.payload.result } }
        case UPDATE_SUB_HEADING_1: return { ...state, result: { ...state.result, subHeading1: action.payload.result } }

        case BUTTON: return { ...state, result: { ...state.result, buttons: action.payload.result } }
        case IMAGE: return { ...state, result: { ...state.result, images: action.payload.result } }

        case DELETE_SECTION: return { ...state, result: action.payload.result }

        case START_LOADING: return { ...state, isLoading: true, isError: false }
        case END_LOADING: return { ...state, isLoading: false, isError: false }
        case ERROR: return { ...state, isError: true, error: action.payload.error }

        default:
            return state;
    }

}

export default homeReducer