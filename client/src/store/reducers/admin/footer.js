import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_FOOTER_CONTENT,
    CREATE_FOOTER_FIRST_DOCUMENT,

    UPDATE_ABOUT_TITLE,
    UPDATE_ABOUT_DETAIL,

    UPDATE_LINKS_TITLE,
    ADD_FOOTER_LINK,
    UPDATE_FOOTER_LINK,
    DELETE_FOOTER_LINK,

    UPDATE_SERVICES_TITLE,
    ADD_FOOTER_SERVICE,
    UPDATE_FOOTER_SERVICE,
    DELETE_FOOTER_SERVICE,

    UPDATE_CONTACT_TITLE,
    ADD_FOOTER_CONTACT,
    UPDATE_FOOTER_CONTACT,
    DELETE_FOOTER_CONTACT,

    UPDATE_COPYRIGHT,

    DELETE_SECTION,


} from "../../constants/admin/index"

const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const footerReducers = (state = initialState, action) => {

    switch (action.type) {

        case GET_FOOTER_CONTENT: return { ...state, result: action.payload.result }
        case CREATE_FOOTER_FIRST_DOCUMENT: return { ...state, result: action.payload.result }

        case UPDATE_ABOUT_TITLE: return { ...state, result: { ...state.result, about: { ...state.result.about, title: action.payload.result } } }
        case UPDATE_ABOUT_DETAIL: return { ...state, result: { ...state.result, about: { ...state.result.about, detail: action.payload.result } } }

        case UPDATE_LINKS_TITLE: return { ...state, result: { ...state.result, links: { ...state.result.links, title: action.payload.result } } }
        case ADD_FOOTER_LINK: return { ...state, result: { ...state.result, links: { ...state.result.links, links: action.payload.result } } }
        case UPDATE_FOOTER_LINK: return { ...state, result: { ...state.result, links: { ...state.result.links, links: state.result.links.links.map(link => link = link._id == action.payload.result._id ? action.payload.result : link) } } }
        case DELETE_FOOTER_LINK: return { ...state, result: { ...state.result, links: { ...state.result.links, links: action.payload.result } } }

        case UPDATE_SERVICES_TITLE: return { ...state, result: { ...state.result, services: { ...state.result.services, title: action.payload.result } } }
        case ADD_FOOTER_SERVICE: return { ...state, result: { ...state.result, services: { ...state.result.services, services: action.payload.result } } }
        case UPDATE_FOOTER_SERVICE: return { ...state, result: { ...state.result, services: { ...state.result.services, services: state.result.services.services.map(service => service = service._id == action.payload.result._id ? action.payload.result : service) } } }
        case DELETE_FOOTER_SERVICE: return { ...state, result: { ...state.result, services: { ...state.result.services, services: action.payload.result } } }

        case UPDATE_CONTACT_TITLE: return { ...state, result: { ...state.result, contacts: { ...state.result.contacts, title: action.payload.result } } }
        case ADD_FOOTER_CONTACT: return { ...state, result: { ...state.result, contacts: { ...state.result.contacts, contacts: action.payload.result } } }
        case UPDATE_FOOTER_CONTACT: return { ...state, result: { ...state.result, contacts: { ...state.result.contacts, contacts: state.result.contacts.contacts.map(contact => contact = contact._id == action.payload.result._id ? action.payload.result : contact) } } }
        case DELETE_FOOTER_CONTACT: return { ...state, result: { ...state.result, contacts: { ...state.result.contacts, contacts: action.payload.result } } }

        case UPDATE_COPYRIGHT: return { ...state, result: { ...state.result, copyright: action.payload.result } }

        case DELETE_SECTION: return { ...state, result: action.payload.result }

        case START_LOADING: return { ...state, isLoading: true, isError: false }
        case END_LOADING: return { ...state, isLoading: false, isError: false }
        case ERROR: return { ...state, isError: true, error: action.payload.error }

        default: return state;
    }

}

export default footerReducers