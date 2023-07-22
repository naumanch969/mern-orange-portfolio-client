import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_SKILLS_CONTENT,
    CREATE_SKILLS_FIRST_DOCUMENT,

    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,
    ADD_SKILL,
    UPDATE_SKILL,
    DELETE_SKILL,

    DELETE_SECTION
} from "../../constants/admin/index"


const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const skillsReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_SKILLS_CONTENT: return { ...state, result: action.payload.result }

        case CREATE_SKILLS_FIRST_DOCUMENT: return { ...state, result: action.payload.result }

        case UPDATE_FORWARD_HEADING: return { ...state, result: { ...state.result, forwardHeading: action.payload.result } }
        case UPDATE_BACK_HEADING: return { ...state, result: { ...state.result, backHeading: action.payload.result } }
        case UPDATE_DETAIL: return { ...state, result: { ...state.result, detail: action.payload.result } }

        case ADD_SKILL: return { ...state, result: { ...state.result, skills: action.payload.result } }
        case UPDATE_SKILL: return { ...state, result: { ...state.result, skills: state.result.skills.map(skill => skill = skill._id == action.payload.result._id ? action.payload.result : skill) } }
        case DELETE_SKILL: return { ...state, result: { ...state.result, skills: action.payload.result } }

        case DELETE_SECTION: return { ...state, result: action.payload.result }

        case START_LOADING: return { ...state, isLoading: true, isError: false }
        case END_LOADING: return { ...state, isLoading: false, isError: false }
        case ERROR: return { ...state, isError: true, error: action.payload.error }

        default: return state;
    }

}

export default skillsReducer