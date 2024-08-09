import validator from 'email-validator'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { useState } from "react"
import Button from "../../components/Button"
import { Input } from '../../components'
import { formSubmit } from '../../../redux/actions/contact'
import { profile } from '../../../assets'

const ContactForm = () => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.contact)
    const initialContactForm = { name: '', email: '', subject: '', message: '' }

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' })
    const [contactValidationMessage, setContactValidationMessage] = useState(initialContactForm)
    const disabled = contactData.name.length == 0 || contactData.email.length == 0 || contactData.subject.length == 0 || contactData.message.length == 0

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1) 
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(formSubmit(contactData, setContactData))
    }
    // 2) 
    const nameBlur = () => {
        if (contactData.name == ``) {
            setContactValidationMessage({ ...contactValidationMessage, name: 'name field is required' })
        }
        else if (contactData.name.length < 3) {
            setContactValidationMessage({ ...contactValidationMessage, name: 'name must be atleast of 3 character' })
        }
        else {
            setContactValidationMessage({ ...contactValidationMessage, name: '' })
        }
    }
    // 3) 
    const emailBlur = () => {
        if (contactData.email == ``) {
            setContactValidationMessage({ ...contactValidationMessage, email: 'email field is required' })
        }
        else if (!(validator.validate(contactData.email))) {
            setContactValidationMessage({ ...contactValidationMessage, email: 'please enter valid email address' })
        }
        else {
            setContactValidationMessage({ ...contactValidationMessage, email: '' })
        }
    }
    // 4) 
    const subjectBlur = () => {
        if (contactData.subject == ``) {
            setContactValidationMessage({ ...contactValidationMessage, subject: 'subject field is required' })
        }
        else if (contactData.subject.length < 3) {
            setContactValidationMessage({ ...contactValidationMessage, subject: 'email must be atleast of 3 character' })
        }
        else {
            setContactValidationMessage({ ...contactValidationMessage, subject: '' })
        }
    }
    // 5) 
    const messageBlur = () => {
        if (contactData.message == ``) {
            setContactValidationMessage({ ...contactValidationMessage, message: 'message field is required' })
        }
        else if (contactData.message.length < 12) {
            setContactValidationMessage({ ...contactValidationMessage, message: 'message must be atleast of 12 character' })
        }
        else {
            setContactValidationMessage({ ...contactValidationMessage, message: '' })
        }
    }




    return (
        <div className="flex h-[660px] mt-[3rem] md:flex-row flex-col md:w-full sm:w-[80%] w-[90%] rounded-[20px] " >
            <div className="md:w-[50%] w-full h-full  bg-darkGray flex justify-center items-center " >
                <img src={profile} alt="contact form image" className="w-[80%] h-full bg-darkGray" />
            </div>
            {/* form */}
            <form method='POST' className="flex justify-between items-start flex-col gap-[2rem] w-full md:w-[50%] h-full bg-white p-[2rem] " >
                <Input
                    light   // for light mode (bg white text black)
                    label='Name'
                    attribute="name"
                    type="text"
                    placeholder="Your name here"
                    blurFunction={nameBlur}
                    formData={contactData}
                    setFormData={setContactData}
                    validationMessage={contactValidationMessage}
                />
                <Input
                    light   // for light mode (bg white text black)
                    label='Email'
                    attribute="email"
                    type="text"
                    placeholder="email@example.com"
                    blurFunction={emailBlur}
                    formData={contactData}
                    setFormData={setContactData}
                    validationMessage={contactValidationMessage}
                />
                <Input
                    light   // for light mode (bg white text black)
                    label='Subject'
                    attribute="subject"
                    type="text"
                    placeholder="Your subject here"
                    blurFunction={subjectBlur}
                    formData={contactData}
                    setFormData={setContactData}
                    validationMessage={contactValidationMessage}
                />
                <Input
                    light   // for light mode (bg white text black)
                    label='Message'
                    attribute="message"
                    type="text"
                    placeholder="Your message here"
                    blurFunction={messageBlur}
                    formData={contactData}
                    setFormData={setContactData}
                    validationMessage={contactValidationMessage}
                    textarea
                    rows={5}
                />
                {/* submit button */}
                <div className='w-full flex justify-end ' >
                    <button onClick={handleSubmit} disabled={disabled} className={`bg-orange text-black ${disabled && 'bg-gray cursor-default '} cursor-pointer border-gray border-[1px] font-normal rounded-[40px] px-[1.5rem] tracking-[1.2] py-[1rem] w-fit h-fit `}>
                        {
                            isLoading
                                ?
                                <div className='flex justify-center items-center gap-[1rem] ' ><p className='' >Submitting...</p><CircularProgress style={{ width: '30px', height: '30px', color: '#fff' }} /></div>
                                :
                                'Submit'
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}


export default ContactForm;