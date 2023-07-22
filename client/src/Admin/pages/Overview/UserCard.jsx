import { useState, useEffect } from "react"
import { Delete } from '@mui/icons-material'
import { Modal } from '@mui/material'
import { motion } from "framer-motion"
import { useStateContext } from "../../../contexts/ContextProvider"
import { useDispatch } from "react-redux"
import { updateAdmin } from '../../../store/actions/user/user'
import TextareaAutosize from "react-textarea-autosize"

const UserCard = ({ readOnly, attribute, item, deleteCard }) => {
    const { people, setPeople, user, isMainAdmin } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const isAdmin = user?.tokens?.find(token => token.name == 'admin_auth_token' || token.name == 'main_admin_auth_token')

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [openModal, setOpenModal] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    const updateAdminFunc = () => {
        let findedAdmin = people.admins.find(a => a._id == item._id)
        findedAdmin = item
        dispatch(updateAdmin(item._id, item.name, item.email, item.phone))
        setPeople({ ...people })
        setOpenModal(false)
    }

    const handleChange = (e) => {
        const findedCard = people[attribute].find(p => p._id == item._id)
        findedCard[e.target.name] = e.target.value
        setPeople({ ...people })
    }

    const deleteCardFunc = () => {
        if (attribute == 'subscribers') {
            const findedUser = people.users.find(u => u.email == item.email)
            findedUser.isSubscribed = false
            dispatch(deleteCard(item.email))        // subscribe
            setPeople({ ...people })
        }
        else {
            people[attribute] = people[attribute].filter(p => p.email !== item.email)
            setPeople({ ...people })
            dispatch(deleteCard(item.email))
        }
    }





    return (
        <div
            className={`${readOnly ? 'lg:w-[32%] md:w-[48%] sm:w-[100%]' : 'w-full'} relative flex flex-col gap-[6px] min:w-fit h-full p-[8px] rounded-[4px] bg-darkGray`}
            onClick={() => !readOnly && isMainAdmin && setOpenModal(true)}
        >


            <div className={`flex flex-row gap-[4px] `}  >
                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Name:</h6>
                {/* i have used TextareaAutosize instead of <p/> to get rid of overflow content */}
                <TextareaAutosize value={item.name} readOnly placeholder="email" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full ' />
            </div>
            <div className={`flex flex-row gap-[4px] `}  >
                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Email:</h6>
                <TextareaAutosize value={item.email} readOnly placeholder="email" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full ' />
            </div>
            <div className={`flex flex-row gap-[4px] `}  >
                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Phone:</h6>
                <TextareaAutosize value={item.phone} readOnly placeholder="email" className='resize-none border-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full ' />
            </div>







            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <div className="max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[90%]" >
                    <div className=" p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                        <div className={`flex`}  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Name:</h6>
                            <TextareaAutosize
                                type='text'
                                name='name'
                                autoComplete='off'
                                placeholder='Type here'
                                value={item.name}
                                onChange={handleChange}
                                className={`${readOnly && 'cursor-default'} border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full `}
                            />
                        </div>
                        <div className={`flex`}  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Email:</h6>
                            <TextareaAutosize
                                type='email'
                                name='email'
                                autoComplete='off'
                                placeholder='Type here'
                                value={item.email}
                                onChange={handleChange}
                                className={`${readOnly && 'cursor-default'} border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full `}
                            />
                        </div>
                        <div className={`flex`}  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Phone:</h6>
                            <TextareaAutosize
                                type='tel'
                                name='phone'
                                autoComplete='off'
                                placeholder='Type here'
                                value={item.phone}
                                onChange={handleChange}
                                className={`${readOnly && 'cursor-default'} border-none resize-none bg-inherit outline-none text-[18px] text-textGray min-w-[10rem] max-w-[100%] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full `}
                            />
                        </div>
                        <div className='flex w-full justify-end'>
                            <button onClick={!readOnly && isMainAdmin && deleteCardFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateAdminFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UserCard;