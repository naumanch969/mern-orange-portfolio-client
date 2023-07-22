import { useState } from "react"
import { Update, Delete } from '@mui/icons-material'
import { Modal } from '@mui/material'
import { useStateContext } from "../../../contexts/ContextProvider"
import { useDispatch } from "react-redux"
import { updateAdmin, deleteAdmin } from '../../../store/actions/user/user'
import TextareaAutosize from "react-textarea-autosize"

const UserTable = ({ attribute, admin, readOnly }) => {
    const { people, setPeople, user, isMainAdmin } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const isAdmin = user?.tokens?.find(token => token.name == 'admin_auth_token' || token.name == 'main_admin_auth_token')

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [showCloseIcon, setShowCloseIcon] = useState(false)
    const [showIcons, setShowIcons] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    const updateAdminFunc = () => {
        let findedAdmin = people.admins.find(u => u._id == admin._id)
        findedAdmin = admin
        dispatch(updateAdmin(admin._id, admin.name, admin.email, admin.phone))
        setPeople({ ...people })
        setOpenModal(false)
    }

    const handleChange = (e) => {
        const findedCard = people[attribute].find(p => p._id == admin._id)
        findedCard[e.target.name] = e.target.value
        setPeople({ ...people })
    }

    const deleteCardFunc = () => {
        if (!readOnly) {
            people[attribute] = people[attribute].filter(p => p.email !== admin.email)
            setPeople({ ...people })
            dispatch(deleteAdmin(admin.email))
        }
    }





    return (
        <>

            <div
                onMouseEnter={() => setShowIcons(true)}
                onMouseLeave={() => setShowIcons(false)}
                className="bg-darkGray flex border-[1px] border-lightGray border-solid "
            >
                <p className={`min-w-[14rem] w-[33%] px-[1rem] py-[8px] ${admin.headingRow ? 'text-[20px] text-white capitalize' : 'text-gray'} capitalize `} >{admin.name}</p>
                <p className={`min-w-[18rem] w-[33%] px-[1rem] py-[8px] ${admin.headingRow ? 'text-[20px] text-white capitalize' : 'text-gray'} `} >{admin.email}</p>
                <p className={`min-w-[12rem] w-[33%] px-[1rem] py-[8px] ${admin.headingRow ? 'text-[20px] text-white capitalize' : 'text-gray'} `} >{admin.phone}</p>
                <div className="w-[4rem] flex justify-center items-center gap-[4px]  " >
                    {
                        showIcons && !admin.headingRow && !readOnly &&
                        <>
                            <button onClick={() => setOpenModal(true)} className=" " > <Update /></button>
                            <button onClick={deleteCardFunc} className=" " > <Delete /></button>
                        </>
                    }
                </div>
            </div>


            <Modal open={openModal} onClose={() => setOpenModal(false)}            >
                <div className="max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[90%]" >
                    <div className=" p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Name:</h6>
                            <TextareaAutosize
                                type='text'
                                name='name'
                                autoComplete='off'
                                placeholder={'Name'}
                                value={admin.name}
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray max-w-[100%] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full `}
                            />
                        </div>
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Email:</h6>
                            <TextareaAutosize
                                type='email'
                                name='email'
                                autoComplete='off'
                                placeholder='Email'
                                value={admin.email}
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray max-w-[100%] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full `}
                            />
                        </div>
                        <div className='flex w-full'  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white `}>Phone:</h6>
                            <TextareaAutosize
                                type='tel'
                                name='phone'
                                autoComplete='off'
                                placeholder='Phone'
                                value={admin.phone}
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray max-w-[100%] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full `}
                            />
                        </div>
                        <div className='flex w-full justify-end '  >
                            <button onClick={updateAdminFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px] " >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default UserTable;


