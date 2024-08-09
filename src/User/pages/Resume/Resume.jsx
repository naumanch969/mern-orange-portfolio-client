import { motion } from "framer-motion"

import { MainHeading, Button } from "../../components"
import ResumeCard from './ResumeCard'
import { getResumes } from '../../../redux/actions/resume'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

const Resume = () => {

    ////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch()
    const {resumes} = useSelector(state=>state.resume)
    ////////////////////////////// STATES /////////////////////////////////////////

    ////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getResumes())
    }, [])

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////

    return (
        <motion.section
            animate={{ y: [0, 1] }}
            transition={{ duration: .3, delayChildren: .5 }}
            name="resume"
            whileInView={{ opacity: [0, 1] }}
            className="h-auto w-full flex flex-col  "
        >

            <div className="w-full flex justify-center" >
                <MainHeading
                    forwardHeading='Resume'
                    backHeading='Resume'
                    detail=''
                />
            </div>

            <div className="flex flex-wrap md;justify-between justify-center gap-[2rem] mt-[3rem] " >
                {
                    resumes.map((resume, index) => (
                        <ResumeCard
                            key={index}
                            title={resume.title}
                            subTitle={resume.subTitle}
                            detail={resume.detail}
                            year={resume.date}
                        />
                    ))
                }
            </div>

            <div className="flex justify-center mt-[2rem] " >
                 <Button text='Download CV' color="black" background="orange" />

            </div>

        </motion.section>
    )
}

export default Resume;



const resumes = [
    {
        year: '2014-2015',
        title: 'Art & Creative Director',
        from: 'Cambridge University',
        detail: 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.'
    },
    {
        year: '2014-2015',
        title: 'Art & Creative Director',
        from: 'Cambridge University',
        detail: 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.'
    },
    {
        year: '2014-2015',
        title: 'Diploma in Computer',
        from: 'Cambridge University',
        detail: 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.'
    },
    {
        year: '2014-2015',
        title: 'Computer Science',
        from: 'Cambridge University',
        detail: 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.'
    },
    {
        year: '2014-2015',
        title: 'UI/UX Desinger',
        from: 'Cambridge University',
        detail: 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.'
    },
    {
        year: '2014-2015',
        title: 'UI/UX developer',
        from: 'Cambridge University',
        detail: 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.'
    },
]