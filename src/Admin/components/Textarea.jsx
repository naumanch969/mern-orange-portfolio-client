import TextareaAutosize from "react-textarea-autosize"
import { useSelector } from "react-redux"

const Textarea = ({ heading, placeholder, blurFunction, attribute, state, setState, id, subAttribute }) => {
    // attribute is the key/field/element of state (state may be about,contact,footer,projects etc.)
    // subAttribute is the key/field/element of findedObject (whose _id = id) of array which is key/field/element of home/about/skills/projects/footer/blogs
    const { loggedUser } = useSelector(state => state.user)

    ////////////////////////////// VARIABLES //////////////////////////////////////
    let findedObj = subAttribute ? state[attribute].find(att => att._id == id) : state

    const isAdmin = loggedUser?.tokens?.find(token => token.name == 'admin_auth_token' || token.name == 'main_admin_auth_token')
    ////////////////////////////// STATES /////////////////////////////////////////

    ////////////////////////////// USE EFFECTS ////////////////////////////////////

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const blur = (e) => {
        blurFunction(e.target.value)
    }

    const handleChange = (e) => {
        findedObj[subAttribute ? subAttribute : attribute] = e.target.value
        setState({ ...state })
    }

    return (
        <div className={`flex sm:flex-row flex-col gap-[4px]`}>
            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>{heading}:</h6>
            <TextareaAutosize
                minRows={1}
                maxRows={6}
                type='text'
                autoComplete='off'
                placeholder={placeholder}
                value={findedObj[subAttribute ? subAttribute : attribute] || ''}
                onBlur={blur}
                onChange={handleChange}
                className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full `}
            />
        </div>

    )
}

export default Textarea;