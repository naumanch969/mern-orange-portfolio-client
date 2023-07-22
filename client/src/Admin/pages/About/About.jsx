
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'

import FileBase64 from "react-file-base64"
import { useStateContext } from '../../../contexts/ContextProvider'
import { Heading, Button, ImageCard, Textarea, Error } from "../../components"
import { Loading } from '../../../utils/Components'
import { getAboutContent, updateForwardHeading, updateBackHeading, updateDetail, updateName, updateDOB, updateAddress, updatePhone, updateEmail, updateSubText, addButton, updateButton, deleteButton, addImage, deleteImage, createAboutFirstDocument, deleteAboutCollection } from '../../../store/actions/admin/about'

const About = () => {
    const { initialAboutState, about, setAbout, user } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const fileBase64Ref = useRef(null)
    const { result, isLoading, isError, error } = useSelector(state => state.about)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getAboutContent())
    }, [])
    useEffect(() => {
        setAbout({ ...about, ...result })
    }, [result])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    // forward heading
    const changeForwardHeading = (text) => {
        about.forwardHeading = text
        dispatch(updateForwardHeading(text))
        setAbout({ ...about })
    }
    // back heading
    const changeBackHeading = (text) => {
        about.backHeading = text
        dispatch(updateBackHeading(text))
        setAbout({ ...about })
    }
    // detail
    const changeDetail = (text) => {
        about.detail = text
        dispatch(updateDetail(text))
        setAbout({ ...about })
    }
    // name
    const changeName = (text) => {
        about.name = text
        dispatch(updateName(text))
        setAbout({ ...about })
    }
    // DOB
    const changeDOB = (text) => {
        about.DOB = text
        dispatch(updateDOB(text))
        setAbout({ ...about })
    }
    // address
    const changeAddress = (text) => {
        about.address = text
        dispatch(updateAddress(text))
        setAbout({ ...about })
    }
    // email
    const changeEmail = (text) => {
        about.email = text
        dispatch(updateEmail(text))
        setAbout({ ...about })
    }
    // phone
    const changePhone = (text) => {
        about.phone = text
        dispatch(updatePhone(text))
        setAbout({ ...about })
    }
    // subText
    const changeSubText = (text) => {
        about.subText = text
        dispatch(updateSubText(text))
        setAbout({ ...about })
    }

    // button
    const addBtn = () => {
        about.buttons = about.buttons.concat({ text: ``, variant: 'contained', _id: '' })
        dispatch(addButton(``, 'contained'))
        setAbout({ ...about })
    }

    // images
    const handleImageButtonClick = () => {
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }
    const addImageFunc = (files) => {
        const uploaded = [...about.images]
        files.some((file) => {
            const { name, size, type, base64 } = file
            const url = base64
            dispatch(addImage({ name, size, type }, url));
            uploaded.concat({ file: { name, size, type }, url });
        })
        setAbout({ ...about, images: uploaded })
    }



    const createAboutSection = () => {
        const isMainAdmin = user?.tokens?.find(t => t.name == 'main_admin_auth_token')
        isMainAdmin &&
            dispatch(createAboutFirstDocument())
    }


    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />

    return (
        <div className="w-full h-full "  >
            {
                result.aboutDocumentNotExist
                    ?
                    <div className="w-full h-full flex justify-center items-center  " >
                        <button onClick={createAboutSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create About Section</button>
                    </div>
                    :
                    <div className="flex flex-col gap-[2rem] " >
                        <Heading
                            title="about"
                            deleteSection={deleteAboutCollection}
                            initialState={initialAboutState}
                            state={about}
                            setState={setAbout}
                        />
                        <div className="flex flex-col gap-[1rem] " >

                            <Textarea
                                state={about}
                                setState={setAbout}
                                blurFunction={changeForwardHeading}
                                placeholder='Type Here'
                                attribute='forwardHeading'
                                heading='Fore Heading'
                            />
                            <Textarea
                                state={about}
                                setState={setAbout}
                                blurFunction={changeBackHeading}
                                placeholder='Type Here'
                                attribute='backHeading'
                                heading='Back Heading'
                            />
                            <Textarea
                                state={about}
                                setState={setAbout}
                                blurFunction={changeDetail}
                                placeholder='Type Here'
                                attribute='detail'
                                heading='Detail'
                            />
                            <Textarea
                                state={about}
                                setState={setAbout}
                                blurFunction={changeName}
                                placeholder='Type Here'
                                attribute='name'
                                heading='Name'
                            />
                            <Textarea
                                state={about}
                                setState={setAbout}
                                blurFunction={changeDOB}
                                placeholder='Type Here'
                                attribute='DOB'
                                heading='DOB'
                            />
                            <Textarea
                                state={about}
                                setState={setAbout}
                                blurFunction={changeAddress}
                                placeholder='Type Here'
                                attribute='address'
                                heading='Address'
                            />
                            <Textarea
                                state={about}
                                setState={setAbout}
                                blurFunction={changePhone}
                                placeholder='Type Here'
                                attribute='phone'
                                heading='Phone'
                            />
                            <Textarea
                                state={about}
                                setState={setAbout}
                                blurFunction={changeEmail}
                                placeholder='Type Here'
                                attribute='email'
                                heading='Email'
                            />
                            <Textarea
                                state={about}
                                setState={setAbout}
                                blurFunction={changeSubText}
                                placeholder='Type Here'
                                attribute='subText'
                                heading='Sub Text'
                            />

                            {/* images */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white " >images :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full " >
                                    <p className="text-[18px] text-textGray  " >{about.images.length}</p>

                                    <div className="flex flex-wrap lg:flex-row md:flex-col sm:flex-col gap-[1rem] " >
                                        {
                                            about.images.map((image, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full" >
                                                    {
                                                        image._id
                                                            ?
                                                            <ImageCard
                                                                image={image}
                                                                state={about}
                                                                setState={setAbout}
                                                                deleteImage={deleteImage}
                                                            />
                                                            :
                                                            <Loading title="Adding Image..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div ref={fileBase64Ref} id="filebase_image" className=" " >
                                        <button onClick={() => handleImageButtonClick()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit " >Add Image</button>
                                        {/* filebase64 component have display none */}
                                        <FileBase64
                                            type="file"
                                            multiple={true}
                                            onDone={(filesArr) => {
                                                addImageFunc(filesArr)
                                            }
                                            }
                                        />
                                    </div>
                                </div>
                            </div>




                            {/* buttons */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white " >buttons :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full " >
                                    <p className="text-[18px] text-textGray  " >{about.buttons.length}</p>
                                    <div className="flex flex-wrap gap-[1rem] lg:flex-row md:flex-col sm:flex-col justify-start " >
                                        {
                                            about.buttons?.map((button, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full" >
                                                    {
                                                        button._id
                                                            ?
                                                            <Button
                                                                button={button}
                                                                state={about}
                                                                setState={setAbout}
                                                                updateButton={updateButton}
                                                                deleteButton={deleteButton}
                                                            />
                                                            :
                                                            <Loading title="Adding Button..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button onClick={() => addBtn()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Button</button>
                                </div>
                            </div>

                        </div>
                    </div>
            }
        </div>
    )
}

export default About