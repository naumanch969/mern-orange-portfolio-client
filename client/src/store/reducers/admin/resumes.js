import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_RESUMES_CONTENT,
    CREATE_RESUMES_FIRST_DOCUMENT,

    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,

    ADD_RESUME,
    UPDATE_RESUME,
    DELETE_RESUME,

    BUTTON,

    DELETE_SECTION
} from "../../constants/admin/index"


const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const resumesReducers = (state = initialState, action) => {

    switch (action.type) {

        case GET_RESUMES_CONTENT: return { ...state, result: action.payload.result }

        case CREATE_RESUMES_FIRST_DOCUMENT: return { ...state, result: action.payload.result }

        case UPDATE_FORWARD_HEADING: return { ...state, result: { ...state.result, forwardHeading: action.payload.result } }
        case UPDATE_BACK_HEADING: return { ...state, result: { ...state.result, backHeading: action.payload.result } }
        case UPDATE_DETAIL: return { ...state, result: { ...state.result, detail: action.payload.result } }

        case BUTTON: return { ...state, result: { ...state.result, buttons: action.payload.result } }

        case ADD_RESUME: return { ...state, result: { ...state.result, resumes: action.payload.result } }
        case UPDATE_RESUME: return { ...state, result: { ...state.result, resumes: state.result.resumes.map(resume => resume = resume._id == action.payload.result._id ? action.payload.result : resume) } }
        case DELETE_RESUME: return { ...state, result: { ...state.result, resumes: action.payload.result } }

        case DELETE_SECTION: return { ...state, result: action.payload.result }

        case START_LOADING: return { ...state, isLoading: true, isError: false }
        case END_LOADING: return { ...state, isLoading: false, isError: false }
        case ERROR: return { ...state, isError: true, error: action.payload.error }

        default: return state;
    }

}

export default resumesReducers