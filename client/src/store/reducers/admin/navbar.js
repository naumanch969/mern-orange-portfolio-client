import {
    START_LOADING,
    END_LOADING,
    ERROR,


    GET_NAVBAR_CONTENT,
    CREATE_NAVBAR_FIRST_DOCUMENT,

    UPDATE_LOGO,
    ADD_NAV_LINK,
    UPDATE_NAV_LINK,
    UPDATE_NAV_LINK_NAME,
    UPDATE_NAV_LINK_LINK,
    DELETE_NAV_LINK,
    ADD_SOCIAL_MEDIA,
    UPDATE_SOCIAL_MEDIA,
    DELETE_SOCIAL_MEDIA,


    DELETE_SECTION
} from "../../constants/admin/index"


const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const navbarReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_NAVBAR_CONTENT: return { ...state, result: action.payload.result }
        case CREATE_NAVBAR_FIRST_DOCUMENT: return { ...state, result: action.payload.result }


        case UPDATE_LOGO: return { ...state, result: { ...state.result, logo: action.payload.result } }


        case ADD_NAV_LINK: return { ...state, result: { ...state.result, navLinks: action.payload.result } }
        case UPDATE_NAV_LINK: return { ...state, result: { ...state.result, navLinks: state.result.navLinks.map(link => link = link._id == action.payload.result._id ? action.payload.result : link) } }
        case UPDATE_NAV_LINK_NAME: return { ...state, result: { ...state.result, navLinks: state.result.navLinks.map(link => link = link._id == action.payload.result._id ? { name: action.payload.result.name, ...link } : link) } }
        case UPDATE_NAV_LINK_LINK: return { ...state, result: { ...state.result, navLinks: state.result.navLinks.map(link => link = link._id == action.payload.result._id ? { link: action.payload.result.link, ...link } : link) } }
        case DELETE_NAV_LINK: return { ...state, result: { ...state.result, navLinks: state.result.navLinks.filter(link => link._id !== action.payload.result) } }


        case ADD_SOCIAL_MEDIA: return { ...state, result: { ...state.result, socialMedia: action.payload.result } }
        case UPDATE_SOCIAL_MEDIA: return { ...state, result: { ...state.result, socialMedia: state.result.socialMedia.map(social => social = social._id == action.payload.result._id ? action.payload.result : social) } }
        case DELETE_SOCIAL_MEDIA: return { ...state, result: { ...state.result, socialMedia: state.result.socialMedia.filter(social => social._id !== action.payload.result) } }


        case DELETE_SECTION: return { ...state, result: action.payload.result }

        case START_LOADING: return { ...state, isLoading: true, isError: false }
        case END_LOADING: return { ...state, isLoading: false, isError: false }
        case ERROR: return { ...state, isError: true, error: action.payload.error }


        default: return state;
    }

}

export default navbarReducer