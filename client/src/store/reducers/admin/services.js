import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_SERVICES_CONTENT,
    CREATE_SERVICES_FIRST_DOCUMENT,

    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,
    ADD_SERVICE,
    UPDATE_SERVICE,
    DELETE_SERVICE,

    DELETE_SECTION
} from "../../constants/admin/index"


const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const servicesReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_SERVICES_CONTENT: return { ...state, result: action.payload.result }

        case CREATE_SERVICES_FIRST_DOCUMENT: return { ...state, result: action.payload.result }

        case UPDATE_FORWARD_HEADING: return { ...state, result: { ...state.result, forwardHeading: action.payload.result } }
        case UPDATE_BACK_HEADING: return { ...state, result: { ...state.result, backHeading: action.payload.result } }
        case UPDATE_DETAIL: return { ...state, result: { ...state.result, detail: action.payload.result } }

        case ADD_SERVICE: return { ...state, result: { ...state.result, services: action.payload.result } }
        case UPDATE_SERVICE: return { ...state, result: { ...state.result, services: state.result.services.map(service => service = service._id == action.payload.result._id ? action.payload.result : service) } }
        case DELETE_SERVICE: return { ...state, result: { ...state.result, services: action.payload.result } }

        case DELETE_SECTION: return { ...state, result: action.payload.result }

        case START_LOADING: return { ...state, isLoading: true, isError: false }
        case END_LOADING: return { ...state, isLoading: false, isError: false }
        case ERROR: return { ...state, isError: true, error: action.payload.error }

        default: return state;
    }

}

export default servicesReducer