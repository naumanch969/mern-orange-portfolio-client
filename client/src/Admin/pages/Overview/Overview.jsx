import { useState, useEffect } from "react"
import { Modal } from '@mui/material'
import { Add, Update, TableRows, GridViewRounded } from "@mui/icons-material"
import { useDispatch, useSelector } from 'react-redux'
import TextareaAutosize from "react-textarea-autosize"

import { Heading, Error } from "../../components"
import UserCard from './UserCard'
import UserRow from './UserRow'
import { Loading } from '../../../utils/Components'
import { getPeopleContent, updateMainAdmin, updateAdmin, addAdmin, deleteAdmin, deleteUser, unsubscribe } from '../../../store/actions/user/user'
import { useStateContext } from '../../../contexts/ContextProvider'

const Overview = () => {
    const { overview, setOverview, people, setPeople, isMainAdmin, isAdmin } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { result, isLoading, isError, error } = useSelector(state => state.people)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [isGridView, setIsGridView] = useState(true)


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getPeopleContent())
    }, [])
    useEffect(() => {
        setPeople({ ...people, ...result })
    }, [result])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const updateMainAdminFunc = () => {
        const { name, email, phone } = people.mainAdmin
        dispatch(updateMainAdmin(name, email, phone))
        setPeople({ ...people })
        setOpenModal(false)
    }

    const addAdminFunc = () => {
        const newAdmin = `admin${people.admins.length + 1}`
        people.admins = people.admins.concat({ name: newAdmin, email: `${newAdmin}@gmail.com`, phone: '03001000000', _id: '' })
        dispatch(addAdmin(newAdmin, `${newAdmin}@gmail.com`, `03001000000`))         // name, email, phone
        setPeople({ ...people })
    }

    const handleChange = (e) => {
        people.mainAdmin[e.target.name] = e.target.value
        setPeople({ ...people })
    }

    const createOverviewSection = () => {
        const isMainAdmin = user?.tokens?.find(token => token.name == 'main_admin_auth_token')
        isMainAdmin &&
            dispatch(createPeopleFirstDocument())
    }

    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />

    return (
        <>
            {
                result.peopleDocumentNotExist
                    ?
                    <div className="w-full h-full flex justify-center items-center  " >
                        <button onClick={createOverviewSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create Overview Section</button>
                    </div>
                    :
                    <div className="flex flex-col gap-[2rem] " >

                        <Heading title="overview" />


                        {/* topbar */}
                        <div className="flex flex-col gap-[1rem] " >
                            <div className='flex flex-wrap gap-[12px] ' >
                                {
                                    tabs.map((tab, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedTabIndex(index)}
                                            className={`${index == selectedTabIndex && 'border-[1px] border-orange '} relative cursor-pointer flex items-center justify-between gap-[1rem] rounded-[50px] py-[6px] px-[16px] bg-lightGray w-auto `}
                                        >
                                            <p className={`${index == selectedTabIndex && 'text-orange '}text-white font-medium w-max text-[16px] capitalize `} >{tab}</p>
                                            <p className="text-[16px] " >{tab == 'subscribers' ? people.users.filter(u => u.isSubscribed == true).length : people[tab]?.length}</p>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="flex flex-wrap gap-[8px] mt-[1rem] w-full " >



                                {/* main admin */}
                                {
                                    tabs[selectedTabIndex] == 'main admin' &&
                                    <div className="flex flex-wrap gap-[8px] w-full " >
                                        {/* update modal open button */}
                                        {isMainAdmin && <div className="w-full flex justify-start pr-[2rem] " > <button onClick={() => setOpenModal(true)} className="capitalize bg-orange px-[8px] py-[4px] rounded-full  " ><Update /></button> </div>}
                                        {/* main admin */}
                                        <>
                                            <div className='flex w-full'  >
                                                <h6 className={`capitalize text-[18px] text-white lg:w-[20%] md:w-[25%] sm:w-[30%] w-full`}>Name:</h6>
                                                <p className={`text-[18px] text-textGray lg:w-[80%] md:w-[75%] sm:w-[70%] w-full `} >
                                                    {people.mainAdmin.name}
                                                </p>
                                            </div>
                                            <div className='flex w-full'  >
                                                <h6 className={`capitalize text-[18px] text-white lg:w-[20%] md:w-[25%] sm:w-[30%] w-full`}>Email:</h6>
                                                <p className={`text-[18px] text-textGray overflow-x-scroll lg:w-[80%] md:w-[75%] sm:w-[70%] w-full `} >
                                                    {people.mainAdmin.email}
                                                </p>
                                            </div>
                                            <div className='flex w-full'  >
                                                <h6 className={`capitalize text-[18px] text-white lg:w-[20%] md:w-[25%] sm:w-[30%] w-full`}>Phone:</h6>
                                                <p className={`text-[18px] text-textGray lg:w-[80%] md:w-[75%] sm:w-[70%] w-full `} >
                                                    {people.mainAdmin.phone}
                                                </p>
                                            </div>
                                        </>
                                    </div>
                                }






                                {/* admins */}
                                {
                                    tabs[selectedTabIndex] == 'admins' &&
                                    <div className="flex flex-col gap-[1rem] w-full " >
                                        <div className="flex justify-between items-center w-full " >
                                            {isMainAdmin && <button onClick={() => addAdminFunc()} className="rounded-full bg-orange p-[4px] w-fit" ><Add /></button>}
                                            <div className="flex items-center justify-between gap-[4px] p-[4px] rounded-[4px] bg-darkGray " >
                                                <button onClick={() => setIsGridView(false)} className={`${!isGridView && 'bg-orange'} rounded-[4px] p-[2px] `} ><TableRows /></button>
                                                <button onClick={() => setIsGridView(true)} className={`${isGridView && 'bg-orange'} rounded-[4px] p-[2px] `} ><GridViewRounded /></button>
                                            </div>
                                        </div>
                                        <div className="w-full overflow-x-scroll " >
                                            {
                                                isGridView
                                                    ?
                                                    <div className="flex flex-wrap gap-[1rem] " >
                                                        {
                                                            people.admins?.map((admin, index) => (
                                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full " >
                                                                    {
                                                                        admin._id
                                                                            ?
                                                                            <UserCard deleteCard={deleteAdmin} item={admin} attribute='admins' />
                                                                            :
                                                                            <Loading title="Adding Card..." />
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    :
                                                    <div className="flex flex-col  min-w-[40rem] " >
                                                        {
                                                            [{ name: 'name', email: 'email', phone: 'phone', headingRow: true }, ...people.admins]?.map((admin, index) => (
                                                                <UserRow admin={admin} attribute='admins' key={index} />
                                                            ))
                                                        }
                                                    </div>
                                            }
                                        </div>

                                    </div>
                                }








                                {/* subscribers */}
                                {
                                    tabs[selectedTabIndex] == 'subscribers' &&
                                    <div className="flex flex-col gap-[1rem] w-full " >
                                        <div className="flex justify-end items-center w-full " >
                                            <div className="flex items-center justify-between gap-[4px] p-[4px] rounded-[4px] bg-darkGray " >
                                                <button onClick={() => setIsGridView(false)} className={`${!isGridView && 'bg-orange'} rounded-[4px] p-[2px] `} ><TableRows /></button>
                                                <button onClick={() => setIsGridView(true)} className={`${isGridView && 'bg-orange'} rounded-[4px] p-[2px] `} ><GridViewRounded /></button>
                                            </div>
                                        </div>
                                        {
                                            isGridView
                                                ?
                                                <div className="flex flex-wrap gap-[1rem] " >
                                                    {
                                                        people.users.filter(u => u.isSubscribed == true)?.map((subscriber, index) => (
                                                            <UserCard item={subscriber} deleteCard={unsubscribe} attribute='subscribers' readOnly />
                                                        ))
                                                    }
                                                </div>
                                                :
                                                <div className="flex flex-col  " >
                                                    {
                                                        [{ name: 'name', email: 'email', phone: 'phone', headingRow: true }, ...(people.users.filter(u => u.isSubscribed == true))]?.map((admin, index) => (
                                                            <UserRow admin={admin} attribute='admins' key={index} readOnly />
                                                        ))
                                                    }
                                                </div>
                                        }
                                    </div>
                                }









                                {/* users */}
                                {
                                    tabs[selectedTabIndex] == 'users' &&
                                    <div className="flex flex-col gap-[1rem] w-full " >
                                        <div className="flex justify-end items-center w-full " >
                                            <div className="flex items-center justify-between gap-[4px] p-[4px] rounded-[4px] bg-darkGray " >
                                                <button onClick={() => setIsGridView(false)} className={`${!isGridView && 'bg-orange'} rounded-[4px] p-[2px] `} ><TableRows /></button>
                                                <button onClick={() => setIsGridView(true)} className={`${isGridView && 'bg-orange'} rounded-[4px] p-[2px] `} ><GridViewRounded /></button>
                                            </div>
                                        </div>
                                        {
                                            isGridView
                                                ?
                                                <div className="flex flex-wrap gap-[1rem]  " >
                                                    {
                                                        people.users?.map((user, index) => (
                                                            <UserCard item={user} deleteCard={deleteUser} attribute='users' readOnly />
                                                        ))
                                                    }
                                                </div>
                                                :
                                                <div className="flex flex-col  " >
                                                    {
                                                        [{ name: 'name', email: 'email', phone: 'phone', headingRow: true }, ...people.users]?.map((admin, index) => (
                                                            <UserRow admin={admin} attribute='admins' key={index} readOnly />
                                                        ))
                                                    }
                                                </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>





                        <Modal open={openModal} onClose={() => setOpenModal(false)}            >
                            <div className="max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[90%]" >
                                <div className="p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full" >
                                    <div className='flex w-full'  >
                                        <h6 className={`capitalize text-[18px] text-white lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%]`}>Name:</h6>
                                        <TextareaAutosize
                                            type='text'
                                            name='name'
                                            autoComplete='off'
                                            placeholder={'Name'}
                                            value={people.mainAdmin.name}
                                            onChange={handleChange}
                                            className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray lg:w-[80%] md:w-[75%] sm:w-[70%] w-[70%] `}
                                        />
                                    </div>
                                    <div className='flex w-full'  >
                                        <h6 className={`capitalize  text-[18px] text-white lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%]`}>Email:</h6>
                                        <TextareaAutosize
                                            type='email'
                                            name='email'
                                            autoComplete='off'
                                            placeholder='Email'
                                            value={people.mainAdmin.email}
                                            onChange={handleChange}
                                            className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray lg:w-[80%] md:w-[75%] sm:w-[70%] w-full`}
                                        />
                                    </div>
                                    <div className='flex w-full'  >
                                        <h6 className={`capitalize  text-[18px] text-white lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%]`}>Phone:</h6>
                                        <TextareaAutosize
                                            type='tel'
                                            name='phone'
                                            autoComplete='off'
                                            placeholder='Phone'
                                            value={people.mainAdmin.phone}
                                            onChange={handleChange}
                                            className={`border-none resize-none bg-inherit outline-none text-[18px] text-textGray lg:w-[80%] md:w-[75%] sm:w-[70%] w-full`}
                                        />
                                    </div>
                                    <div className='flex w-full justify-end '  >
                                        <button onClick={updateMainAdminFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px] " >Update</button>
                                    </div>
                                </div>
                            </div>
                        </Modal>


                    </div>
            }
        </>
    )
}

export default Overview


const tabs = [
    'main admin',
    'admins',
    'subscribers',
    'users',
]