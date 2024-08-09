import { motion } from "framer-motion"

import { MainHeading } from "../../components"
import Skillbar from './Skillbar'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSkills } from '../../../redux/actions/skill'

const Skills = () => {

    ////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch()
    const { skills } = useSelector(state => state.skill)

    ////////////////////////////// STATES /////////////////////////////////////////

    ////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getSkills())
    }, [])

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////



    return (
        <motion.section
            whileInView={{ opacity: [0, 1] }}
            animate={{ y: [0, 1] }}
            transition={{ duration: .3, delayChildren: .5 }}
            name="skills"
        >

            <div className="w-full flex justify-center" >
                <MainHeading
                    forwardHeading='Skills'
                    backHeading='Skills'
                    detail='With a strong foundation in the MERN stack and extensive experience with front-end and back-end technologies, I am committed to staying up-to-date with the latest web development trends to deliver cutting-edge solutions that meet and exceed client expectations'
                />
            </div>

            <div className="flex flex-wrap justify-center items-center gap-[2rem] mt-[3rem] " >
                {
                    skills.map((skill, index) => (
                        <Skillbar key={index} skill={skill} />
                    ))
                }
            </div>

        </motion.section>

    )
}

export default Skills;


const skills = [
    {
        title: 'HTML5',
        percentage: '95'
    },
    {
        title: 'CSS3',
        percentage: '90'
    },
    {
        title: 'Javascript',
        percentage: '65'
    },
    {
        title: 'React JS',
        percentage: '85'
    },
    {
        title: 'React Redux',
        percentage: '75'
    },
    {
        title: 'Material UI',
        percentage: '85'
    },
    {
        title: 'Tailwind CSS',
        percentage: '75'
    },
    {
        title: 'Mongo DB',
        percentage: '65'
    },
]