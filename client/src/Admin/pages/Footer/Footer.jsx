import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import TextareaAutosize from "react-textarea-autosize"

import { Heading, SubHeading, Textarea, Error } from "../../components"
import FooterService from './FooterService'
import FooterLink from './FooterLink'
import FooterContact from './FooterContact'
import { Loading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import { createFooterFirstDocument, getFooterContent, updateAboutDetail, updateAboutTitle, updateLinksTitle, addLink, updateServicesTitle, addService, updateContactTitle, addContact, updateCopyright, deleteFooterSection } from '../../../store/actions/admin/footer'

const Footer = () => {
    const { initialFooterState, footer, setFooter } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { result, isLoading, isError, error } = useSelector(state => state.footer)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getFooterContent())
    }, [])
    useEffect(() => {
        setFooter({ ...footer, ...result })
    }, [result])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // 1)   -   about
    const changeAboutTitle = (title) => {
        footer.about.title = title
        dispatch(updateAboutTitle(title))
        setFooter({ ...footer })
    }
    // 2)
    const changeAboutDetail = (detail) => {
        footer.about.detail = detail
        dispatch(updateAboutDetail(detail))
        setFooter({ ...footer })
    }
    // 3)   -   services
    const addServiceFunc = () => {
        footer.services.services = footer.services.services.concat({ name: `service${footer.services.services.length + 1}`, link: `#service${footer.services.services.length + 1}`, _id: '' })
        dispatch(addService(`service${footer.services.services.length}`, `#service${footer.services.services.length}`))
        setFooter({ ...footer })
    }
    // 4)
    const changeServicesTitle = (title) => {
        footer.services.title = title
        dispatch(updateServicesTitle(title))
        setFooter({ ...footer })
    }
    // 5)   -   links
    const changeLinksTitle = (title) => {
        footer.links.title = title
        dispatch(updateLinksTitle(title))
        setFooter({ ...footer })
    }
    // 6)
    const addLinkFunc = () => {
        footer.links.links = footer.links.links.concat({ name: `link${footer.links.links.length + 1}`, link: `#link${footer.links.links.length + 1}`, _id: '' })
        dispatch(addLink(`link${footer.links.links.length}`, `#link${footer.links.links.length}`))
        setFooter({ ...footer })
    }
    // 7)   -   contacts
    const changeContactsTitle = (title) => {
        footer.contacts.title = title
        dispatch(updateContactTitle(title))
        setFooter({ ...footer })
    }
    // 8)
    const addContactFunc = () => {
        footer.contacts.contacts = footer.contacts.contacts.concat({ icon: `icon${footer.contacts.contacts.length + 1}`, text: 'text', _id: '' })
        dispatch(addContact(`icon${footer.contacts.contacts.length}`, 'text'))
        setFooter({ ...footer })
    }
    // 9)   -   copyright
    const changeCopyRight = (text) => {
        footer.copyright = text
        dispatch(updateCopyright(text))
        setFooter({ ...footer })
    }
    // 10)  -   footer section
    const createFooterSection = () => {
        dispatch(createFooterFirstDocument())
    }


    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />

    return (
        <div className="w-full h-full "  >
            {
                result.footerDocumentNotExist
                    ?
                    <div className="w-full h-full flex justify-center items-center  " >
                        <button onClick={createFooterSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create Footer Section</button>
                    </div>
                    :
                    <div className="flex flex-col gap-[2rem] " >

                        <Heading
                            title="footer"
                            deleteSection={deleteFooterSection}
                            initialState={initialFooterState}
                            state={footer}
                            setState={setFooter}
                        />

                        <div className="flex flex-col gap-[1rem] " >

                            {/* about */}
                            <SubHeading title={`About`} />
                            {/* title */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Title :</h6>
                                <TextareaAutosize
                                    type="text"
                                    autoComplete='off'
                                    placeholder="Title...."
                                    value={footer.about.title}
                                    onBlur={(e) => changeAboutTitle(e.target.value)}
                                    onChange={(e) => setFooter({ ...footer, about: { ...footer.about, title: e.target.value } })}
                                    className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] lg:max-w-[80%] md:max-w-[75%] `}
                                />
                            </div>
                            {/* detail */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Detail :</h6>
                                <TextareaAutosize
                                    type="text"
                                    autoComplete='off'
                                    placeholder="Detail...."
                                    value={footer.about.detail}
                                    onBlur={(e) => changeAboutDetail(e.target.value)}
                                    onChange={(e) => setFooter({ ...footer, about: { ...footer.about, detail: e.target.value } })}
                                    className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full `}
                                />
                            </div>


                            {/* services */}
                            <SubHeading title={`Services`} />
                            {/* title */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Title :</h6>
                                <TextareaAutosize
                                    type="text"
                                    autoComplete='off'
                                    placeholder="Title...."
                                    value={footer.services.title}
                                    onBlur={(e) => changeServicesTitle(e.target.value)}
                                    onChange={(e) => setFooter({ ...footer, services: { ...footer.services, title: e.target.value } })}
                                    className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] lg:max-w-[80%] md:max-w-[65%] `}
                                />
                            </div>
                            {/* Services */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Services :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full" >
                                    <p className="text-[18px] text-textGray  " >{footer.services.services.length}</p>
                                    <div className="flex flex-wrap gap-[1rem] lg:flex-row md:flex-col sm:flex-col " >
                                        {
                                            footer.services.services?.map((service, index) => (
                                                <div key={index} className="w-[18rem] min-h-[8rem] " >
                                                    {
                                                        service._id
                                                            ?
                                                            <FooterService k service={service} />
                                                            :
                                                            <Loading title="Adding Service..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="w-full flex justify-end items-center " >
                                        <button onClick={() => addServiceFunc()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Service</button>
                                    </div>
                                </div>
                            </div>


                            {/* links */}
                            <SubHeading title={`Links`} />
                            {/* title */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Title :</h6>
                                <TextareaAutosize
                                    type="text"
                                    autoComplete='off'
                                    placeholder="Title...."
                                    value={footer.links.title}
                                    onBlur={(e) => changeLinksTitle(e.target.value)}
                                    onChange={(e) => setFooter({ ...footer, links: { ...footer.links, title: e.target.value } })}
                                    className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] lg:max-w-[80%] md:max-w-[65%] `}
                                />
                            </div>
                            {/* Links */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Links :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full" >
                                    <p className="text-[18px] text-textGray  " >{footer.links.links.length}</p>
                                    <div className="flex flex-wrap gap-[1rem] lg:flex-row md:flex-col sm:flex-col " >
                                        {
                                            footer.links.links?.map((link, index) => (
                                                <div key={index} className="w-[18rem] min-h-[8rem] " >
                                                    {
                                                        link._id
                                                            ?
                                                            <FooterLink link={link} />
                                                            :
                                                            <Loading title="Adding Link..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="w-full flex justify-end items-center " >
                                        <button onClick={() => addLinkFunc()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Link</button>
                                    </div>
                                </div>
                            </div>


                            {/* contacts */}
                            <SubHeading title={`Contact`} />
                            {/* title */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Title :</h6>
                                <TextareaAutosize
                                    type="text"
                                    autoComplete='off'
                                    placeholder="Title...."
                                    value={footer.contacts.title}
                                    onBlur={(e) => changeContactsTitle(e.target.value)}
                                    onChange={(e) => setFooter({ ...footer, contacts: { ...footer.contacts, title: e.target.value } })}
                                    className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] lg:max-w-[80%] md:max-w-[65%] `}
                                />
                            </div>
                            {/* Contacts */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Contacts :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full" >
                                    <p className="text-[18px] text-textGray  " >{footer.contacts.contacts.length}</p>
                                    <div className="flex flex-wrap gap-[1rem] lg:flex-row md:flex-col sm:flex-col " >
                                        {
                                            footer.contacts.contacts?.map((contact, index) => (
                                                <div key={index} className="w-[18rem] min-h-[8rem] " >
                                                    {
                                                        contact._id
                                                            ?
                                                            <FooterContact contact={contact} />
                                                            :
                                                            <Loading title="Adding Card..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="w-full flex justify-end items-center " >
                                        <button onClick={() => addContactFunc()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Contact</button>
                                    </div>
                                </div>
                            </div>


                            {/* copyright */}
                            <Textarea
                                heading='copyright'
                                placeholder='Type Here'
                                attribute='copyright'
                                blurFunction={changeCopyRight}
                                state={footer}
                                setState={setFooter}
                            />


                        </div>
                    </div>
            }
        </div>
    )
}

export default Footer