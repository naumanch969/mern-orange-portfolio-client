import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_PROJECTS_CONTENT,
    CREATE_PROJECTS_FIRST_DOCUMENT,

    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,

    ADD_PROJECT,
    UPDATE_PROJECT,
    ADD_PROJECT_IMAGE,
    DELETE_PROJECT_IMAGE,
    DELETE_PROJECT,

    DELETE_SECTION
} from "../../constants/admin/index"

const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const projectsReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_PROJECTS_CONTENT: return { ...state, result: action.payload.result }
        case CREATE_PROJECTS_FIRST_DOCUMENT: return { ...state, result: action.payload.result }

        case UPDATE_FORWARD_HEADING: return { ...state, result: { ...state.result, forwardHeading: action.payload.result } }
        case UPDATE_BACK_HEADING: return { ...state, result: { ...state.result, backHeading: action.payload.result } }
        case UPDATE_DETAIL: return { ...state, result: { ...state.result, detail: action.payload.result } }

        case ADD_PROJECT: return { ...state, result: { ...state.result, projects: action.payload.result } }
        case UPDATE_PROJECT: return { ...state, result: { ...state.result, projects: state.result.projects.map(project => project = project._id == action.payload.result._id ? action.payload.result : project) } }

        case ADD_PROJECT_IMAGE:
            return { ...state, result: { ...state.result, projects: state.result.projects.map(project => project.images = project._id == action.payload.result._id ? action.payload.result : project.images) } }
        case DELETE_PROJECT_IMAGE: return { ...state, result: { ...state.result, projects: state.result.projects.map(project => project.images = project.images.filter(img => img._id !== action.payload.result)) } }
        case DELETE_PROJECT: return { ...state, result: { ...state.result, projects: action.payload.result } }

        case DELETE_SECTION: return { ...state, result: action.payload.result }

        case START_LOADING: return { ...state, isLoading: true, isError: false }
        case END_LOADING: return { ...state, isLoading: false, isError: false }
        case ERROR: return { ...state, isError: true, error: action.payload.error }

        default: return state;
    }

}

export default projectsReducer