import React, { useState } from 'react'
import { createSkill } from '../../../redux/actions/skill'
import { useDispatch } from 'react-redux'
import { Close } from '@mui/icons-material'
import { Modal } from '@mui/material'
import TextareaAutosize from 'react-textarea-autosize'
import { DropDown } from '../../components'
import { icons } from '../../../data'

const Create = ({ open, setOpen }) => {

    /////////////////////////////////////// VARIABLES /////////////////////////////////////
    const dispatch = useDispatch()

    /////////////////////////////////////// STATES /////////////////////////////////////
    const [skillData, setSkillData] = useState({ skill: '', percentage: '' })

    /////////////////////////////////////// FUNCTIONS /////////////////////////////////////
    const handleCreateSkill = () => {
        dispatch(createSkill(skillData, setOpen))
    }
    const handleChange = (e) => {
        setSkillData({ ...skillData, [e.target.name]: e.target.value })
    }


    return (
        <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >
            <div className="sm:w-[20rem] w-[90%] max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] " >

                <div className="w-full flex justify-start items-center py-[12px] px-[8px] bg-lightGray text-white shadow-xl ">
                    <h3 className='text-[20px]   ' >Create Skill</h3>
                </div>

                <div className="p-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-white `}>Skill:</h6>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Skill'
                            value={skillData?.skill}
                            name='skill'
                            onChange={handleChange}
                            className={`w-full bg-black h-[40px] rounded-[4px] px-[8px] py-[8px] resize-none outline-none text-[16px] text-textGray text-start   `}
                        />
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-white `}>Percentage:</h6>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Percentage'
                            value={skillData?.percentage}
                            name='percentage'
                            onChange={handleChange}
                            className={`w-full bg-black h-[40px] rounded-[4px] px-[8px] py-[8px] resize-none outline-none text-[16px] text-textGray text-start   `}
                        />
                    </div>
                    <div className='flex w-full justify-end gap-[8px] '>
                        <button onClick={() => setOpen(false)} className="bg-[#0d0d0d] text-white rounded-[4px] px-[6px] py-[4px]">
                            Close
                        </button>
                        <button onClick={handleCreateSkill} className="bg-orange text-white rounded-[4px] px-[6px] py-[4px]" >
                            Create
                        </button>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default Create