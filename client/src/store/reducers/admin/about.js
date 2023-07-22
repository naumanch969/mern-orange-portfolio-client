import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_ABOUT_CONTENT,
    CREATE_ABOUT_FIRST_DOCUMENT,

    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,
    UPDATE_NAME,
    UPDATE_DOB,
    UPDATE_ADDRESS,
    UPDATE_PHONE,
    UPDATE_EMAIL,
    UPDATE_SUB_TEXT,
    BUTTON, IMAGE,
    DELETE_SECTION
} from "../../constants/admin/index"


const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const aboutReducers = (state = initialState, action) => {

    switch (action.type) {

        case GET_ABOUT_CONTENT: return { ...state, result: action.payload.result }
        case CREATE_ABOUT_FIRST_DOCUMENT: return { ...state, result: action.payload.result }

        case BUTTON: return { ...state, result: { ...state.result, buttons: action.payload.result } }
        case IMAGE: return { ...state, result: { ...state.result, images: action.payload.result } }

        case UPDATE_FORWARD_HEADING: return {
            ...state,
            result: {
                ...state.result,
                forwardHeading: action.payload.result
            }
        }
        case UPDATE_BACK_HEADING: return { ...state, result: { ...state.result, backHeading: action.payload.result } }
        case UPDATE_DETAIL: return { ...state, result: { ...state.result, detail: action.payload.result } }

        case UPDATE_NAME: return { ...state, result: { ...state.result, name: action.payload.result } }
        case UPDATE_DOB: return { ...state, result: { ...state.result, DOB: action.payload.result } }
        case UPDATE_ADDRESS: return { ...state, result: { ...state.result, address: action.payload.result } }
        case UPDATE_PHONE: return { ...state, result: { ...state.result, phone: action.payload.result } }
        case UPDATE_EMAIL: return { ...state, result: { ...state.result, email: action.payload.result } }
        case UPDATE_SUB_TEXT: return { ...state, result: { ...state.result, subText: action.payload.result } }

        case DELETE_SECTION: return { ...state, result: action.payload.result }

        case START_LOADING: return { ...state, isLoading: true, isError: false }
        case END_LOADING: return { ...state, isLoading: false, isError: false }
        case ERROR: return { ...state, isError: true, error: action.payload.error }

        default: return state;
    }
}

export default aboutReducers