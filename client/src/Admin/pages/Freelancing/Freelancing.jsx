import { Add, Clear } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { Heading, Textarea, Button, Error } from "../../components"
import FeatureCard from './FeatureCard'
import FreelancingCard from './FreelancingCard'
import { Loading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import { getFreelancingContent, createFreelancingFirstDocument, updateHeading, updateDetail, addFeatureCard, updateFeatureCard, addFreelancingCard, updateFreelancingCardTitle, updateFreelancingCardDetail, deleteFreelancingCard, addSubFreelancingCard, updateSubFreelancingCard, deleteSubFreelancingCard, addButton, updateButton, deleteButton, deleteFreelancingCollection } from '../../../store/actions/admin/freelancing'

const Freelancing = () => {
    const { initialFreelancingState, freelancing, setFreelancing } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    const { result, isLoading, isError, error } = useSelector(state => state.freelancing)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [showCloseIcon, setShowCloseIcon] = useState(null)
    const [selectedFLIndex, setSelectedFLIndex] = useState(0)
    const [reload, setReload] = useState(false)


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getFreelancingContent())
    }, [])
    useEffect(() => {
        setFreelancing({ ...freelancing, ...result })
    }, [result,])


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const changeHeading = (heading) => {
        freelancing.heading = heading
        dispatch(updateHeading(heading))
        setFreelancing({ ...freelancing })
    }
    const changeDetail = (detail) => {
        freelancing.detail = detail
        dispatch(updateDetail(detail))
        setFreelancing({ ...freelancing })
    }
    const addBtn = () => {
        freelancing.buttons = freelancing.buttons.concat({ text: ``, variant: 'contained', _id: '' })
        dispatch(addButton(``, 'contained'))
        setFreelancing({ ...freelancing })
    }

    const addFeatureCardFunc = () => {
        freelancing.featureCards = freelancing.featureCards.concat({ title: '', quantity: '', _id: '' })
        dispatch(addFeatureCard('', ''))         // title, quantity
        setFreelancing({ ...freelancing })
    }
    const addFreelancingCardFunc = () => {
        freelancing.freelancingCards = freelancing.freelancingCards.concat({ title: 'card', cards: [], detail: '', _id: '' })
        dispatch(addFreelancingCard('card', [], '', []))         // title, cards, detail, images
        setFreelancing({ ...freelancing })
        setReload(pre => !pre)
    }

    const deleteFreelancingCardFunc = (freelancingCardId, index) => {
        freelancing.freelancingCards = freelancing.freelancingCards.filter(c => c._id != freelancingCardId)
        dispatch(deleteFreelancingCard(freelancingCardId))         // title, cards, detail
        setFreelancing({ ...freelancing })
        index != 0 ? setSelectedFLIndex(index - 1) : setSelectedFLIndex(0)
    }

    const createFreelancingSection = () => {
        dispatch(createFreelancingFirstDocument())
    }




    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />

    return (
        <div className="w-full h-full "  >
            {
                result.freelancingDocumentNotExist
                    ?
                    <div className="w-full h-full flex justify-center items-center  " >
                        <button onClick={createFreelancingSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create Freelancing Section</button>
                    </div>
                    :
                    <div className="flex flex-col gap-[2rem] " >

                        <Heading
                            title="freelancing"
                            deleteSection={deleteFreelancingCollection}
                            initialState={initialFreelancingState}
                            state={freelancing}
                            setState={setFreelancing}
                        />
                        <div className="flex flex-col gap-[1rem] " >
                            <Textarea
                                heading='Heading'
                                placeholder='Type Here'
                                attribute='heading'
                                blurFunction={changeHeading}
                                state={freelancing}
                                setState={setFreelancing}
                            />
                            <Textarea
                                heading='Detail'
                                placeholder='Type Here'
                                attribute='detail'
                                blurFunction={changeDetail}
                                state={freelancing}
                                setState={setFreelancing}
                            />


                            {/* buttons */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize  lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white " >buttons :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full" >
                                    <p className="text-[18px] text-textGray  " >{freelancing.buttons.length}</p>
                                    <div className="flex flex-wrap gap-[1rem] lg:flex-row md:flex-col sm:flex-col justify-start " >
                                        {
                                            freelancing.buttons?.map((button, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full" >
                                                    {
                                                        button._id
                                                            ?
                                                            <Button
                                                                button={button}
                                                                state={freelancing}
                                                                setState={setFreelancing}
                                                                deleteButton={deleteButton}
                                                                updateButton={updateButton}
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






                            {/* feature Cards */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white " >feature cards :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full" >
                                    <p className="capitalize  text-[18px] text-white  " >{freelancing.featureCards.length}</p>

                                    <div className="flex flex-wrap md:flex-row sm:flex-col gap-[1rem] w-full " >
                                        {
                                            freelancing.featureCards.map((featureCard, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full " >
                                                    {
                                                        featureCard._id
                                                            ?
                                                            <FeatureCard featureCard={featureCard} />
                                                            :
                                                            <Loading title="Adding Card..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button onClick={() => addFeatureCardFunc()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Feature Card</button>
                                </div>
                            </div>




                            {/* freelancing Cards */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white " >freelancing cards :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full" >
                                    <p className="capitalize  text-[18px] text-white  " >{freelancing.freelancingCards.length}</p>
                                    {/* topbar */}
                                    <div className='flex flex-wrap gap-[12px] ' >
                                        {
                                            freelancing.freelancingCards.map((freelancingCard, index) => (
                                                <div
                                                    onMouseEnter={() => setShowCloseIcon(index)}
                                                    onMouseLeave={() => setShowCloseIcon(null)}
                                                    key={index}
                                                    onClick={() => setSelectedFLIndex(index)}
                                                    className={`${freelancing.freelancingCards[selectedFLIndex]?.title == freelancingCard.title && 'border-[1px] border-orange '} relative cursor-pointer flex items-center justify-between gap-[1rem] rounded-[50px] py-[0px] px-[16px] bg-lightGray w-auto `}
                                                >
                                                    {showCloseIcon == index && <button onClick={() => deleteFreelancingCardFunc(freelancingCard._id)} className="absolute bottom-[60%] right-[-10px] w-[16px] h-[16px] bg-darkGray border-[1px] border-orange flex justify-center items-center rounded-full  " ><Clear style={{ fontSize: '12px' }} className="text-white text-[12px] " /></button>}
                                                    <p className={`${freelancing.freelancingCards[selectedFLIndex]?.title == freelancingCard.title && 'text-orange '}text-white font-medium w-max text-[16px] capitalize `} >{freelancingCard.title}</p>
                                                    <p className="text-[16px] " >{freelancing.freelancingCards[index]?.cards?.length}</p>
                                                </div>
                                            ))
                                        }
                                        <button onClick={() => addFreelancingCardFunc()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" ><Add /></button>
                                    </div>

                                    {/* cards */}
                                    <div className="flex flex-wrap md:flex-row sm:flex-col gap-[1rem] w-full " >
                                        {
                                            freelancing.freelancingCards.map((freelancingCard, index) => (
                                                <div key={index} className="w-full " >

                                                    {
                                                        selectedFLIndex == index &&
                                                        <FreelancingCard freelancingCard={freelancingCard} />
                                                    }

                                                </div>
                                            ))
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Freelancing