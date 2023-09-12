import { Close } from "@mui/icons-material"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Textarea } from '.'
import { useDispatch } from "react-redux"
import { updateSkill, deleteSkill } from '../../redux/actions/skill'
import TextareaAutosize from "react-textarea-autosize"

const Skill = ({ id: skillId }) => {


    ////////////////////////////// VARIABLES //////////////////////////////////////
    const inputRef = useRef(null)
    const outputRef = useRef(null)
    const { skills } = useSelector(state => state.skill)
    const findedSkill = skills.find(skill => skill._id == skillId)
    const dispatch = useDispatch()

    ////////////////////////////// STATES /////////////////////////////////////////
    const [showCloseIcon, setShowCloseIcon] = useState(false)
    const [outputValue, setOutputValue] = useState(findedSkill?.percentage)
    const [showPercentage, setShowPercetage] = useState(false)

    ////////////////////////////// USE EFFECTS ////////////////////////////////////

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const changeSkill = (skill) => {
        findedSkill.skill = skill
        dispatch(updateSkill(skillId, skill, findedSkill.percentage))
        setSkills({ ...skills })
    }
    const changePercentage = (percentage) => {
        findedSkill.percentage = percentage
        dispatch(updateSkill(skillId, findedSkill.skill, percentage))
        setSkills({ ...skills })
    }

    const deleteSkillFunc = () => {
        skills.skills = skills.skills.filter(skill => skill._id !== skillId)
        dispatch(deleteSkill(skillId))
    }


    const handleRangeChange = (e) => {
        setOutputValue(e.target.value)
        const input = inputRef.current
        const output = outputRef.current

        const range = input.value
        const min = input.min ? input.min : 0
        const max = input.max ? input.max : 0
        const newRange = Number(((range - min) * 100) / (max - min));

        // output.innerHTML = range
        output.style.left = `calc(${newRange}% + (${8 - newRange * 0.15}px))`;

        findedSkill.percentage = e.target.value
        setSkills({ ...skills })
    }

    const handleChange = (e) => {
        findedObj[subAttribute ? subAttribute : attribute] = e.target.value
        setSkills({ ...skills })
    }


    return (
        <div
            onMouseEnter={() => setShowCloseIcon(true)}
            onMouseLeave={() => setShowCloseIcon(false)}
            className="relative flex flex-col gap-[12px] w-full p-[16px] rounded-[4px] bg-darkGray "
        >

            {
                showCloseIcon &&
                <button className="absolute top-[4px] right-[4px] " onClick={() => deleteSkillFunc()}>
                    <Close />
                </button>
            }

            <div className={`flex sm:flex-row flex-col `}  >
                <h6 className={`capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white `}>Skill:</h6>
                <TextareaAutosize
                    type='text'
                    autoComplete='off'
                    placeholder='Skill'
                    value={findedSkill.skill}
                    name='skill'
                    onChange={handleChange}
                    className={`border-none resize-none bg-inherit outline-none text-[16px] text-textGray text-start w-full min-w-[10rem] max-w-[100%]  `}
                />
            </div>
            <div className="flex relative  " >
                <h6 className="capitalize text-[16px] w-[35%] text-white " >%age:</h6>
                <div className="relative min-w-[10rem] lg:max-w-[80%] md:max-w-[65%]  " >
                    <p className="text-textGray " >{outputValue}%</p>
                    <input
                        type="range"
                        className={`w-full`}
                        value={findedSkill?.percentage}
                        onInput={handleRangeChange}
                        onMouseEnter={() => setShowPercetage(true)}
                        onMouseLeave={() => { setShowPercetage(false) }}
                        onMouseUp={(e) => { changePercentage(e.target.value) }}
                        min={1}
                        max={100}
                        ref={inputRef}
                        id='percentage_range'
                    />
                    {
                        showPercentage &&
                        <p
                            ref={outputRef}
                            style={{ left: `${outputValue}%` }}
                            className={` skillPercentageRange bg-orange text-white w-[40px] h-[24px] flex justify-center items-center absolute left-[${findedSkill.percentage}%] transform translate-x-[-50%] rounded-[4px]`}
                        >
                            {outputValue}%
                        </p>
                    }
                </div>
            </div>



        </div >
    )
}

export default Skill;



