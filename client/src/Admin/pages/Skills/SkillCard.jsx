import { Close, Delete } from "@mui/icons-material"
import { useState, useRef, useEffect } from "react"
import { Modal } from "@mui/material"
import { motion } from "framer-motion"
import { Textarea } from '../../components'
import { useStateContext } from "../../../contexts/ContextProvider"
import { useDispatch } from "react-redux"
import { updateSkill, deleteSkill } from '../../../store/actions/admin/skills'
import TextareaAutosize from "react-textarea-autosize"

const Skill = ({ skill }) => {
    const { skills, setSkills } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const inputRef = useRef(null)
    const outputRef = useRef(null)
    const dispatch = useDispatch()

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [openModal, setOpenModal] = useState(false)
    const [outputValue, setOutputValue] = useState(skill?.percentage)
    const [showPercentage, setShowPercetage] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const updateSkillFunc = (skill) => {
        dispatch(updateSkill(skill._id, skill))
        setOpenModal(false)
        setSkills({ ...skills })
    }

    const deleteSkillFunc = () => {
        skills.skills = skills.skills.filter(skill => skill._id !== skill._id)
        dispatch(deleteSkill(skill._id))
        setOpenModal(false)
    }

    const handleChange = (e) => {
        skill[e.target.name] = e.target.value
        setSkills({ ...skills })
    }


    return (
        <>


            <div onClick={() => setOpenModal(true)} className="relative flex flex-col gap-[12px] w-full p-[16px] rounded-[4px] bg-darkGray ">
                <div className={`flex   `}  >
                    <h6 className={`capitalize lg:w-[40%] md:w-[30%] sm:w-[35%] w-full text-[18px] text-white `}>Skill:</h6>
                    <p className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `} >
                        {skill?.skill}
                    </p>
                </div>
                <div className={`flex   `}  >
                    <h6 className={` lg:w-[40%] md:w-[30%] sm:w-[35%] w-full text-[18px] text-white `}>%age:</h6>
                    <p className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `} >
                        {skill?.percentage}
                    </p>
                </div>
            </div>






            <Modal open={openModal} onClose={() => setOpenModal(false)}            >
                <div className="max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[90%]" >
                    <div className=" p-[2rem] pb-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                        <div className={`flex sm:flex-row flex-col `}  >
                            <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Title:</h6>
                            <TextareaAutosize
                                type='text'
                                autoComplete='off'
                                placeholder='Skill'
                                value={skill.skill}
                                name='skill'
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                            />
                        </div>
                        <div className={`flex sm:flex-row flex-col `}  >
                            <h6 className="capitalize text-[16px] w-[35%] text-white " >%age:</h6>
                            <TextareaAutosize
                                type='text'
                                autoComplete='off'
                                placeholder='Skill'
                                value={skill.percentage}
                                name='percentage'
                                onChange={handleChange}
                                className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                            />
                        </div>
                        <div className='flex w-full justify-between'>
                            <button onClick={deleteSkillFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateSkillFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </ >
    )
}

export default Skill;






{/* range */ }
 // const handleRangeChange = (e) => {
    //     setOutputValue(e.target.value)
    //     const input = inputRef.current
    //     const output = outputRef.current

    //     const range = input.value
    //     const min = input.min ? input.min : 0
    //     const max = input.max ? input.max : 0
    //     const newRange = Number(((range - min) * 100) / (max - min));

    //     // output.innerHTML = range
    //     output.style.left = `calc(${newRange}% + (${8 - newRange * 0.15}px))`;

    //     findedSkill.percentage = e.target.value
    //     setSkills({ ...skills })
    // }
    // <div className="relative min-w-[10rem] lg:max-w-[80%] md:max-w-[65%]  " >
    //     <p className="text-textGray " >{outputValue}%</p>
    //     <input
    //         type="range"
    //         className={`w-full`}
    //         value={findedSkill?.percentage}
    //         onInput={handleRangeChange}
    //         onMouseEnter={() => setShowPercetage(true)}
    //         onMouseLeave={() => { setShowPercetage(false) }}
    //         onMouseUp={(e) => { changePercentage(e.target.value) }}
    //         min={1}
    //         max={100}
    //         ref={inputRef}
    //         id='percentage_range'
    //     />
    //     {
    //         showPercentage &&
    //         <p
    //             ref={outputRef}
    //             style={{ left: `${outputValue}%` }}
    //             className={` skillPercentageRange bg-orange text-white w-[40px] h-[24px] flex justify-center items-center absolute left-[${findedSkill.percentage}%] transform translate-x-[-50%] rounded-[4px]`}
    //         >
    //             {outputValue}%
    //         </p>
    //     }
    // </div>