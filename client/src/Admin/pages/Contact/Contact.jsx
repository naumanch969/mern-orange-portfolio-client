import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import TextareaAutosize from "react-textarea-autosize"
import FileBase64 from 'react-file-base64'

import { Heading, Button, SubHeading, ImageCard, Textarea, Error } from "../../components"
import ContactCard from './ContactCard'
import { Loading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import { getContactContent, updateForwardHeading, updateBackHeading, updateDetail, addContactCard, addImage, deleteImage, updateInputs, addButton, updateButton, deleteButton, createContactFirstDocument, deleteContactCollection } from '../../../store/actions/admin/contact'

const Contact = () => {
    const { initialContactState, contact, setContact } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const fileBase64Ref = useRef(null)
    const { result, isLoading, isError, error } = useSelector(state => state.contact)


    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getContactContent())
    }, [])
    useEffect(() => {
        setContact({ ...contact, ...result })
    }, [result])


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // forward heading
    const changeForwardHeading = (text) => {
        contact.forwardHeading = text
        dispatch(updateForwardHeading(text))
        setContact({ ...contact })
    }

    // back heading
    const changeBackHeading = (text) => {
        contact.backHeading = text
        dispatch(updateBackHeading(text))
        setContact({ ...contact })
    }

    // detail
    const changeDetail = (text) => {
        contact.detail = text
        dispatch(updateDetail(text))
        setContact({ ...contact })
    }

    // buttons
    const addContactCardFunc = () => {
        contact.cards = contact.cards.concat({ icon: 'icon', title: ``, detail: '' })
        dispatch(addContactCard(`icon`, ``, ''))
        setContact({ ...contact })
    }

    // buttons
    const addBtn = () => {
        contact.buttons = contact.buttons.concat({ text: ``, variant: 'contained', _id: '' })
        dispatch(addButton(``, 'contained'))
        setContact({ ...contact })
    }

    // images
    const handleImageButtonClick = () => {
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }
    const addImageFunc = (files) => {
        const uploaded = [...contact.images]
        files.some((file) => {      // file is an object
            if (contact.images.findIndex((f) => f.file.name === file.name) === -1) {          // to make sure, the current file is not uploaded already
                const { name, size, type, base64 } = file
                const url = base64
                dispatch(addImage({ name, size, type }, url));
                uploaded.concat({ file: { name, size, type }, url });
            }
        })
        setContact({ ...contact, images: uploaded })
    }


    const changeNameInput = (name) => {
        const contactData = { ...contact.inputs, name }
        dispatch(updateInputs(contactData))
        setContact({ ...contact })
    }
    const changeEmailInput = (email) => {
        contact.inputs.email = email
        dispatch(updateInputs({ ...contact.inputs, email }))
        setContact({ ...contact })
    }
    const changeSubjectInput = (subject) => {
        contact.inputs.subject = subject
        dispatch(updateInputs({ ...contact.inputs, subject }))
        setContact({ ...contact })
    }
    const changeMessageInput = (message) => {
        contact.inputs.message = message
        dispatch(updateInputs({ ...contact.inputs, message }))
        setContact({ ...contact })
    }


    const createContactSection = () => {
        dispatch(createContactFirstDocument())
    }


    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />

    return (
        <div className="w-full h-full "  >
            {
                result.contactDocumentNotExist
                    ?
                    <div className="w-full h-full flex justify-center items-center  " >
                        <button onClick={createContactSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create Contact Section</button>
                    </div>
                    :
                    <div className="flex flex-col gap-[2rem] " >
                        <Heading
                            title="contact"
                            deleteSection={deleteContactCollection}
                            initialState={initialContactState}
                            state={contact}
                            setState={setContact}
                        />

                        <div className="flex flex-col gap-[1rem] " >

                            {/* headings */}
                            <Textarea
                                heading='Fore Heading'
                                placeholder='Type Here'
                                attribute='forwardHeading'
                                blurFunction={changeForwardHeading}
                                state={contact}
                                setState={setContact}
                            />
                            <Textarea
                                heading='Back Heading'
                                placeholder='Type Here'
                                attribute='backHeading'
                                blurFunction={changeBackHeading}
                                state={contact}
                                setState={setContact}
                            />
                            <Textarea
                                heading='Detail'
                                placeholder='Type Here'
                                attribute='detail'
                                blurFunction={changeDetail}
                                state={contact}
                                setState={setContact}
                            />


                            {/* contact cards */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Contact Cards:</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full " >
                                    <p className="text-[18px] text-textGray  " >{contact.cards.length}</p>
                                    <div className="flex flex-wrap gap-[1rem] lg:flex-row md:flex-col sm:flex-col " >
                                        {
                                            contact?.cards.map((card, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full " >
                                                    {
                                                        card._id
                                                            ?
                                                            <ContactCard card={card} />
                                                            :
                                                            <Loading title="Adding Card..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='w-full flex justify-end items-center ' >
                                        <button onClick={() => addContactCardFunc()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Contact Card</button>
                                    </div>
                                </div>
                            </div>


                            {/* buttons */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Buttons :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full " >
                                    <p className="text-[18px] text-textGray " >{contact.buttons.length}</p>
                                    <div className="flex flex-wrap gap-[1rem] lg:flex-row md:flex-col sm:flex-col " >
                                        {
                                            contact.buttons?.map((button, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full " >
                                                    {
                                                        button._id
                                                            ?
                                                            <Button button={button} state={contact} setState={setContact} deleteButton={deleteButton} updateButton={updateButton} />
                                                            :
                                                            <Loading title="Adding Button..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='w-full flex justify-end items-center ' >
                                        <button onClick={() => addBtn()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Button</button>
                                    </div>
                                </div>
                            </div>


                            {/* images */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Images :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full" >

                                    <p className="text-[18px] text-textGray  " >{contact.images.length}</p>

                                    <div className="flex flex-wrap lg:flex-row md:flex-col sm:flex-col gap-[1rem] " >

                                        {
                                            contact.images.map((image, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full" >
                                                    {
                                                        image._id
                                                            ?
                                                            <ImageCard image={image} state={contact} setState={setContact} deleteImage={deleteImage} />
                                                            :
                                                            <Loading title='Fetching Image...' />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div ref={fileBase64Ref} id="filebase_image" className="w-full flex justify-end items-center " >

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


                            {/* inputs */}
                            <SubHeading title={`Inputs`} />
                            {/* title */}
                            <div className="flex  " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white " >Name:</h6>
                                <TextareaAutosize
                                    type="text"
                                    autoComplete='off'
                                    placeholder="Name"
                                    value={contact.inputs?.name}
                                    onBlur={(e) => changeNameInput(e.target.value)}
                                    onChange={(e) => {
                                        setContact({ ...contact, inputs: { ...contact.inputs, name: e.target.value } })
                                    }}
                                    className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] lg:max-w-[80%] md:max-w-[65%] `}
                                />
                            </div>
                            <div className="flex  " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white " >Email:</h6>
                                <TextareaAutosize
                                    type="text"
                                    autoComplete='off'
                                    placeholder="Email"
                                    value={contact.inputs.email}
                                    onBlur={(e) => changeEmailInput(e.target.value)}
                                    onChange={(e) => setContact({ ...contact, inputs: { ...contact.inputs, email: e.target.value } })}
                                    className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] lg:max-w-[80%] md:max-w-[65%] `}
                                />
                            </div>
                            <div className="flex  " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white " >Subject:</h6>
                                <TextareaAutosize
                                    type="text"
                                    autoComplete='off'
                                    placeholder="Subject"
                                    value={contact.inputs.subject}
                                    onBlur={(e) => changeSubjectInput(e.target.value)}
                                    onChange={(e) => setContact({ ...contact, inputs: { ...contact.inputs, subject: e.target.value } })}
                                    className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] lg:max-w-[80%] md:max-w-[65%] `}
                                />
                            </div>
                            <div className="flex  " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white " >Message:</h6>
                                <TextareaAutosize
                                    type="text"
                                    autoComplete='off'
                                    placeholder="Message"
                                    value={contact.inputs.message}
                                    onBlur={(e) => changeMessageInput(e.target.value)}
                                    onChange={(e) => setContact({ ...contact, inputs: { ...contact.inputs, message: e.target.value } })}
                                    className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] lg:max-w-[80%] md:max-w-[65%] `}
                                />
                            </div>






                        </div>


                    </div>
            }
        </div>
    )
}

export default Contact

