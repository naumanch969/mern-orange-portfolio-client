
import { Camera, Clear, Add } from "@mui/icons-material"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import TextareaAutosize from "react-textarea-autosize"
import FileBase64 from 'react-file-base64'
import { Heading, SubHeading, Error } from "../../components"
import NavCard from './NavCard'
import { Loading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import { getNavbarContent, createNavbarFirstDocument, updateLogo, addNavLink, updateNavLink, deleteNavLink, addSocialMedia, updateSocialMedia, deleteSocialMedia, deleteNavbarCollection } from '../../../store/actions/admin/navbar'

const Navbar = () => {
    const { initialNavbarState, navbar, setNavbar } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const fileBase64Ref = useRef(null)
    const { result, isLoading, isError, error } = useSelector(state => state.navbar)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [showImageCloseButton, setShowImageCloseButton] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getNavbarContent())
    }, [])
    useEffect(() => {
        setNavbar({ ...navbar, ...result })
    }, [result])



    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // logo text
    const changeLogoText = (text) => {
        navbar.logo.logoText = text
        dispatch(updateLogo(text, navbar.logo.logoImage))
        setNavbar({ ...navbar })
    }
    // images
    const handleImageButtonClick = () => {
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }
    const addImageFunc = (files) => {
        const { name, size, type, base64 } = files[0]
        const url = base64
        const image = { file: { name, size, type }, url }
        dispatch(updateLogo(navbar.logo.logoText, image));
        navbar.logo.logoImage = image
        setNavbar({ ...navbar })
    }
    const deleteNavbarImageFunc = () => {
        const nullImage = {}
        navbar.logo.logoImage = nullImage
        dispatch(updateLogo(navbar.logo.logoText, nullImage))
        setNavbar({ ...navbar })
    }

    const addNavLinkFunc = () => {
        navbar.navLinks = navbar.navLinks.concat({ name: ``, link: '', _id: '' })
        dispatch(addNavLink('', ''))            // name, link
        setNavbar({ ...navbar })
    }
    const addSocialMediaFunc = () => {
        navbar.socialMedia = navbar.socialMedia.concat({ name: ``, link: '', _id: '' })
        dispatch(addSocialMedia('', ''))        // name, link
        setNavbar({ ...navbar })
    }

    const createNavbarSection = () => {
        dispatch(createNavbarFirstDocument())
    }


    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />

    return (
        <div className="w-full h-full "  >
            <>
                {
                    result.navbarDocumentNotExist
                        ?
                        <div className="w-full h-full flex justify-center items-center  " >
                            <button onClick={createNavbarSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create Navbar Section</button>
                        </div>
                        :
                        <div className="flex flex-col gap-[2rem] " >
                            <Heading
                                title="navbar"
                                deleteSection={deleteNavbarCollection}
                                initialState={initialNavbarState}
                                state={navbar}
                                setState={setNavbar}
                            />


                            <div className="flex flex-col gap-[1rem] " >

                                <SubHeading title={`Logo`} />
                                <div className="flex flex-col gap-[1rem] pl-[1rem] " >
                                    {/* logo text */}
                                    <div className="flex   " >
                                        <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white " >Text :</h6>
                                        <TextareaAutosize
                                            type="text"
                                            autoComplete='off'
                                            placeholder="Logo Text"
                                            value={navbar.logo.logoText}
                                            onBlur={(e) => changeLogoText(e.target.value)}
                                            onChange={(e) => setNavbar({ ...navbar, logo: { ...navbar.logo, logoText: e.target.value } })}
                                            className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] lg:max-w-[80%] md:max-w-[65%] `}
                                        />
                                    </div>
                                    {/* logo image */}
                                    <div className="flex  " >
                                        <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%]sm:w-[30%] w-[30%] text-[18px] text-white " >Image :</h6>
                                        {
                                            navbar.logo.logoImage?.url
                                                ?
                                                <div
                                                    onMouseEnter={() => setShowImageCloseButton(true)}
                                                    onMouseLeave={() => setShowImageCloseButton(false)}
                                                    className="relative w-[7rem] h-[7rem] p-[8px] rounded-full flex justify-center items-center"
                                                >
                                                    <img src={navbar.logo.logoImage?.url} alt="" className="w-full h-full rounded-full " height='100%' />
                                                    {showImageCloseButton && <button onClick={() => deleteNavbarImageFunc()} className="absolute top-[0px] right-[0px] text-white" ><Clear /></button>}
                                                </div>
                                                :
                                                <div ref={fileBase64Ref} id="filebase_image" className=" w-[7rem] h-[7rem] p-[8px] rounded-full bg-lightGray  flex justify-center items-center " >
                                                    <button onClick={() => handleImageButtonClick()} className="flex flex-col justify-center items-center text-textGray  " >
                                                        <Camera /> Add Photo
                                                    </button>
                                                    <FileBase64 type="file" multiple={true} onDone={(filesArr) => { addImageFunc(filesArr) }} />
                                                </div>
                                        }
                                    </div>
                                </div>




                                {/* Nav links */}
                                <div className="flex md:flex-row sm:flex-col flex-col  " >
                                    <SubHeading title={`Nav Links`} />
                                    <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full " >
                                        <p className="text-[18px] text-textGray  " >{navbar.navLinks.length}</p>
                                        <div className="flex flex-wrap gap-[1rem] lg:flex-row md:justify-start sm:justify-end justify-center " >
                                            {
                                                navbar.navLinks?.map((navLink, index) => (
                                                    <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:max-w-[16rem] w-[80%] " >
                                                        {
                                                            navLink._id
                                                                ?
                                                                <NavCard
                                                                    navItem={navLink}
                                                                    attribute='navLinks'
                                                                    updateNavItem={updateNavLink}
                                                                    deleteNavItem={deleteNavLink}
                                                                />
                                                                :
                                                                <Loading title="Adding Card..." />
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="w-full flex justify-end items-center " >
                                            <button onClick={() => addNavLinkFunc()} className="rounded-full bg-darkGray py-[6px] px-[12px] w-fit" >Add NavLink</button>
                                        </div>
                                    </div>
                                </div>




                                {/* Social Media  */}
                                <div className="flex md:flex-row sm:flex-col flex-col " >
                                    <SubHeading title={`Social Media`} />
                                    <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full" >
                                        <p className="text-[18px] text-textGray  " >{navbar.socialMedia.length}</p>
                                        <div className="flex flex-wrap gap-[1rem] lg:flex-row md:justify-start sm:justify-end justify-center " >
                                            {
                                                navbar.socialMedia?.map((socialMedia, index) => (
                                                    <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:max-w-[16rem] w-[80%]" >
                                                        {
                                                            socialMedia._id
                                                                ?
                                                                <NavCard
                                                                    key={index}
                                                                    navItem={socialMedia}
                                                                    attribute='socialMedia'
                                                                    updateNavItem={updateSocialMedia}
                                                                    deleteNavItem={deleteSocialMedia}
                                                                />
                                                                :
                                                                <Loading title="Adding Card..." />
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="w-full flex justify-end items-center " >
                                            <button onClick={() => addSocialMediaFunc()} className="rounded-full bg-darkGray py-[6px] px-[12px] w-fit" >Add Social Media</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </>
        </div>
    )

}

export default Navbar
