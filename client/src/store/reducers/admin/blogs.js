import {
    START_LOADING,
    END_LOADING,
    ERROR,

    GET_BLOGS_CONTENT,
    CREATE_BLOGS_FIRST_DOCUMENT,

    UPDATE_FORWARD_HEADING,
    UPDATE_BACK_HEADING,
    UPDATE_DETAIL,

    ADD_BLOG,
    UPDATE_BLOG,
    ADD_BLOG_IMAGE,
    DELETE_BLOG_IMAGE,
    DELETE_BLOG,


    DELETE_SECTION
} from "../../constants/admin/index"


const initialState = {
    result: [],
    isLoading: false,
    isError: false,
    error: ''
}

const blogsReducers = (state = initialState, action) => {

    switch (action.type) {

        case GET_BLOGS_CONTENT:
            return { ...state, result: action.payload.result }

        case CREATE_BLOGS_FIRST_DOCUMENT:
            return { ...state, result: action.payload.result }

        case UPDATE_FORWARD_HEADING: return { ...state, result: { ...state.result, forwardHeading: action.payload.result } }
        case UPDATE_BACK_HEADING: return { ...state, result: { ...state.result, backHeading: action.payload.result } }
        case UPDATE_DETAIL: return { ...state, result: { ...state.result, detail: action.payload.result } }


        case ADD_BLOG: return { ...state, result: { ...state.result, blogs: action.payload.result } }
        case UPDATE_BLOG: return { ...state, result: { ...state.result, blogs: state.result.blogs.map(blog => blog = blog._id == action.payload.result._id ? action.payload.result : blog) } }
        case ADD_BLOG_IMAGE:
        case DELETE_BLOG_IMAGE: return { ...state, result: { ...state.result, blogs: state.result.blogs.map(blog => blog.images = blog._id == action.payload.result._id ? action.payload.result : blog.images) } }
        case DELETE_BLOG: return { ...state, result: { ...state.result, blogs: action.payload.result } }


        case START_LOADING: return { ...state, isLoading: true, isError: false }
        case END_LOADING: return { ...state, isLoading: false, isError: false }
        case ERROR: return { ...state, isError: true, error: action.payload.error }

        default:
            return state;
    }

}

export default blogsReducers