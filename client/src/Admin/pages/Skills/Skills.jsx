import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { Heading, Button, Textarea, Error } from "../../components"
import SkillCard from './SkillCard'
import { Loading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import { getSkillsContent, updateForwardHeading, updateBackHeading, updateDetail, addSkill, updateSkill, deleteSkill, createSkillsFirstDocument, deleteSkillsCollection } from '../../../store/actions/admin/skills'

const Skills = () => {
    const { initialSkillsState, skills, setSkills } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const fileBase64Ref = useRef(null)
    const { result, isLoading, isError, error } = useSelector(state => state.skills)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getSkillsContent())
    }, [])
    useEffect(() => {
        setSkills({ ...skills, ...result })
    }, [result])



    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const changeForwardHeading = (text) => {
        dispatch(updateForwardHeading(text))
    }
    const changeBackHeading = (text) => {
        dispatch(updateBackHeading(text))
    }
    const changeDetail = (text) => {
        dispatch(updateDetail(text))
    }
    const addSkillFunc = () => {
        skills.skills = skills.skills.concat({ skill: ``, percentage: '', _id: '' })
        dispatch(addSkill('', ''))
        setSkills({ ...skills })
    }


    const createSkillsSection = () => {
        dispatch(createSkillsFirstDocument())
    }



    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />


    return (
        <div className="w-full h-full "  >
            {
                result.skillsDocumentNotExist
                    ?
                    <div className="w-full h-full flex justify-center items-center  " >
                        <button onClick={createSkillsSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create Skills Section</button>
                    </div>
                    :
                    <div className="flex flex-col gap-[2rem] " >
                        <Heading
                            title="skills"
                            deleteSection={deleteSkillsCollection}
                            initialState={initialSkillsState}
                            state={skills}
                            setState={setSkills}
                        />

                        <div className="flex flex-col gap-[1rem] " >




                            <Textarea
                                heading='Forward Heading'
                                placeholder='Type Here'
                                attribute='forwardHeading'
                                blurFunction={changeForwardHeading}
                                state={skills}
                                setState={setSkills}
                            />
                            <Textarea
                                heading='Back Heading'
                                placeholder='Type Here'
                                attribute='backHeading'
                                blurFunction={changeBackHeading}
                                state={skills}
                                setState={setSkills}
                            />
                            <Textarea
                                heading='Detail'
                                placeholder='Type Here'
                                attribute='detail'
                                blurFunction={changeDetail}
                                state={skills}
                                setState={setSkills}
                            />
                            {/* skills */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize text-[18px] text-white lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%]" >skills :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full " >
                                    <p className="text-[18px] text-textGray  " >{skills.skills.length}</p>
                                    <div className="flex flex-wrap gap-[1rem] lg:flex-row md:flex-col sm:flex-col " >
                                        {
                                            skills.skills?.map((skill, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full " >
                                                    {
                                                        skill._id
                                                            ?
                                                            <SkillCard skill={skill} />
                                                            :
                                                            <Loading title="Adding Card..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button onClick={() => addSkillFunc()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Skill</button>
                                </div>
                            </div>



                        </div>


                    </div>
            }
        </div>
    )
}

export default Skills

