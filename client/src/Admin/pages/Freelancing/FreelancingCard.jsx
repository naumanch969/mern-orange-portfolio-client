import { OpenInFull, Delete, Clear, ModeEdit, Camera } from "@mui/icons-material"
import { Modal } from '@mui/material'
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { CircularProgress } from '@mui/material'
import { updateFreelancingCardTitle, updateDetail, updateFreelancingCardDetail, deleteFreelancingCard, addSubFreelancingCard, updateSubFreelancingCard, deleteSubFreelancingCard } from '../../../store/actions/admin/freelancing'
import { useDispatch } from "react-redux"
import { useStateContext } from "../../../contexts/ContextProvider"
import { Loading } from '../../../utils/Components'
import { Slider } from '../../components'
import { limitText } from '../../../utils/functions'
import TextareaAutosize from "react-textarea-autosize"
import FileBase64 from 'react-file-base64'
// title category link github detail
const FreelancingCard = ({ freelancingCard }) => {

    const { freelancing, setFreelancing } = useStateContext()
    const dispatch = useDispatch()
    const fileBase64Ref = useRef(null)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [showImageCloseButton, setShowImageCloseButton] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [selectedCard, setSelectedCard] = useState(false)
    const [clickedCard, setClickedCard] = useState(false)


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////



    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const changeTitle = (title) => {
        freelancingCard.title = title
        dispatch(updateFreelancingCardTitle(freelancingCard?._id, title))
        setFreelancing({ ...freelancing })
    }
    const changeDetail = (detail) => {
        freelancingCard.detail = detail
        dispatch(updateFreelancingCardDetail(freelancingCard._id, detail))
        setFreelancing({ ...freelancing })
    }




    const addSubCard = () => {
        const subCardData = { title: '', description: '', link: '', category: '', images: [] }
        freelancingCard.cards = freelancingCard.cards.concat({ ...subCardData, _id: '' })
        dispatch(addSubFreelancingCard(freelancingCard._id, subCardData))
        setFreelancing({ ...freelancing })
    }
    const updateSubCard = () => {
        let findedCard = freelancingCard.cards.filter((c) => c._id == selectedCard._id)[0]
        findedCard = selectedCard
        dispatch(updateSubFreelancingCard(freelancingCard?._id, selectedCard._id, findedCard))
        setOpenModal(false)
        setFreelancing({ ...freelancing })
    }
    const changeCardTitle = (cardId, title) => {
        const findedCard = freelancingCard.cards.filter((c) => c._id == cardId)[0]

        const subCardData = { ...findedCard, title }
        dispatch(updateSubFreelancingCard(freelancingCard?._id, cardId, subCardData))
        setFreelancing({ ...freelancing })
    }
    const changeCardDescription = (cardId, description) => {
        const findedCard = freelancingCard.cards.filter((c) => c._id == cardId)[0]
        const subCardData = { ...findedCard, description, }
        dispatch(updateSubFreelancingCard(freelancingCard?._id, cardId, subCardData))
        setFreelancing({ ...freelancing })
    }
    const changeCardLink = (cardId, link) => {
        const findedCard = freelancingCard.cards.filter((c) => c._id == cardId)[0]
        const subCardData = { ...findedCard, link, }
        dispatch(updateSubFreelancingCard(freelancingCard?._id, cardId, subCardData))
        setFreelancing({ ...freelancing })
    }
    const changeCardCategory = (cardId, category) => {
        const findedCard = freelancingCard.cards.filter((c) => c._id == cardId)[0]
        const subCardData = { ...findedCard, category }
        dispatch(updateSubFreelancingCard(freelancingCard?._id, cardId, subCardData))
        setFreelancing({ ...freelancing })
    }
    const deleteCardFunc = (card) => {
        freelancingCard.cards = freelancingCard.cards.filter(c => c._id !== card._id)
        dispatch(deleteSubFreelancingCard(freelancingCard._id, card._id))
        setFreelancing({ ...freelancing })
        setOpenModal(false)
    }



    const handleImageButtonClick = () => {
        fileBase64Ref?.current?.querySelector('input[type="file"]').click();
    }
    const addImageFunc = (cardId, files) => {

        const findedCard = freelancingCard.cards.filter((c) => c._id == cardId)[0]
        let uploaded = [...findedCard.images]
        files.some((file) => {      // file is an object
            const { name, size, type, base64 } = file
            const url = base64
            uploaded = uploaded.concat({ file: { name, size, type }, url });
        })
        findedCard.images = uploaded
        setFreelancing({ ...freelancing })
    }
    const deleteImageFunc = (cardId, imageId) => {
        const findedCard = freelancingCard.cards.filter((c) => c._id == cardId)[0]
        findedCard.images = findedCard.images.filter(img => img._id !== imageId)
        setFreelancing({ ...freelancing })
    }




    const handleChange = (e) => {
        freelancingCard[e.target.name] = e.target.value
        setFreelancing({ ...freelancing })
    }
    const handleCardChange = (cardId, e) => {
        const findedCard = freelancingCard.cards.filter(c => c._id == cardId)[0]
        findedCard[e.target.name] = e.target.value
        setFreelancing({ ...freelancing })
    }

    return (
        <>

            <div
                className="relative p-[8px] rounded-[4px] w-full "
            >
                {
                    !freelancingCard._id
                        ?
                        <CircularProgress />
                        :
                        <div className=" relative flex flex-col justify-start gap-[16px] w-full h-full " >

                            <div className="flex flex-col justify-between gap-[8px] w-full h-full " >
                                <TextareaAutosize
                                    type='text'
                                    autoComplete='off'
                                    placeholder='Title'
                                    value={freelancingCard?.title}
                                    name='title'
                                    onBlur={(e) => changeTitle(e.target.value)}
                                    onChange={handleChange}
                                    className={`border-none resize-none bg-inherit outline-none text-[24px] text-white capitalize text-start w-full min-w-[10rem] max-w-[100%]  `}
                                />
                                <TextareaAutosize
                                    type='text'
                                    autoComplete='off'
                                    placeholder='Detail'
                                    value={freelancingCard?.detali}
                                    name='detail'
                                    onBlur={(e) => changeDetail(e.target.value)}
                                    onChange={handleChange}
                                    className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                                />
                            </div>

                            <div className="flex flex-col gap-[16px] " >
                                {/* cards */}
                                <div className="flex flex-wrap gap-[1rem] " >
                                    {
                                        freelancingCard.cards?.map((card, index) => (
                                            <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] w-full " >
                                                {
                                                    card._id
                                                        ?
                                                        <div
                                                            className="relative cursor-pointer p-[8px] rounded-[4px] bg-darkGray border-[1px] border-white "
                                                        >
                                                            {/* gig card */}
                                                            <div className=" relative flex flex-col justify-start gap-[6px] w-full h-full  " >
                                                                <div className="w-full h-[180px] flex justify-center items-center " >
                                                                    <Slider images={card.images} />
                                                                </div>
                                                                <div onClick={() => { setOpenModal(true); setSelectedCard(card) }} className="w-full flex flex-col" >
                                                                    {/* gig card title */}
                                                                    <p className={`text-[20px] text-white   text-start w-full  `} >{limitText(card.title, 60) || 'title'}</p>
                                                                    {/* gig card description */}
                                                                    <p className={`text-[16px] text-textGray  text-start w-full  `} >{limitText(card.description, 120) || 'description'}</p>
                                                                    {/* gig card link */}
                                                                    <p className={`text-[16px] text-linkBlue  text-start w-full  `} >{card.link || 'link'}</p>
                                                                    {/* gig card category */}
                                                                    <p className={`text-[16px] text-textGray  text-start w-full  `} >{card.category || 'category'}</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        :
                                                        <Loading title='Adding Card...' />
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="w-full flex justify-end items-center " >
                                    <button onClick={() => addSubCard()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Card</button>
                                </div>
                            </div>

                        </div>
                }
            </div>










            <Modal open={openModal} onClose={() => updateSubCard()} >
                <div className="max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[90%]" >
                    <div className=" p-[2rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                        {
                            selectedCard?.images?.length
                                ?
                                <div
                                    onMouseEnter={() => setShowImageCloseButton(true)}
                                    onMouseLeave={() => setShowImageCloseButton(false)}
                                    className="relative h-[12rem] w-full flex justify-center "
                                >
                                    <Slider images={selectedCard.images} deleteImageFunc={deleteImageFunc} addImageFunc={addImageFunc} sliderInModal subFreelancingCardId={selectedCard._id} />
                                </div>
                                :
                                <div ref={fileBase64Ref} id="filebase_image" className="w-full min-h-[10rem] max-h-[12rem] flex justify-center items-center " >
                                    <button onClick={() => handleImageButtonClick()} className="flex flex-col justify-center items-center text-textGray  " >
                                        <Camera /> Add Photo
                                    </button>
                                    <FileBase64 type="file" multiple={true} onDone={(filesArr) => addImageFunc(selectedCard._id, filesArr)} />
                                </div>
                        }
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Title'
                            value={selectedCard.title}
                            name='title'
                            onChange={(event) => handleCardChange(selectedCard._id, event)}
                            className={`border-none resize-none bg-inherit outline-none text-[18px] text-white w-full `}
                        />
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Description'
                            value={selectedCard.description}
                            name='description'
                            onChange={(event) => handleCardChange(selectedCard._id, event)}
                            className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray w-full `}
                        />
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Link'
                            value={selectedCard.link}
                            name='link'
                            onChange={(event) => handleCardChange(selectedCard._id, event)}
                            className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray w-full `}
                        />
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Category'
                            value={selectedCard.category}
                            name='category'
                            onChange={(event) => handleCardChange(selectedCard._id, event)}
                            className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray w-full `}
                        />
                        <div className="flex justify-between items-center " >
                            <button onClick={() => deleteCardFunc(selectedCard)} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateSubCard} className="bg-orange text-white rounded-full px-[8px] py-[4px] " >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default FreelancingCard;