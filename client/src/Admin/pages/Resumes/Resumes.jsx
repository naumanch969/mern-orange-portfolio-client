import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Heading, Textarea, Button, Error } from "../../components"
import ResumeCard from './ResumeCard'
import { Loading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import { getResumesContent, updateForwardHeading, updateBackHeading, updateDetail, addResume, addButton, updateButton, deleteButton, createResumesFirstDocument, deleteResumesCollection } from '../../../store/actions/admin/resumes'

const Resumes = () => {
    const { initialResumesState, resumes, setResumes, formattedDateTime } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()

    const { result, isLoading, isError, error } = useSelector(state => state.resumes)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getResumesContent())
    }, [])
    useEffect(() => {
        setResumes({ ...resumes, ...result })
    }, [result])



    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const changeForwardHeading = (text) => {
        resumes.forwardHeading = text
        dispatch(updateForwardHeading(text))
        setResumes({ ...resumes })
    }
    const changeBackHeading = (text) => {
        resumes.backHeading = text
        dispatch(updateBackHeading(text))
        setResumes({ ...resumes })
    }
    const changeDetail = (text) => {
        resumes.detail = text
        dispatch(updateDetail(text))
        setResumes({ ...resumes })
    }

    const addResumeFunc = () => {
        const resumeData = {
            title: 'title',
            subTitle: 'sub title',
            detail: 'lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar lorem ipsum dolar',
            date: formattedDateTime
        }
        resumes.resumes = resumes.resumes.concat({ ...resumeData, _id: '' })
        dispatch(addResume(resumeData))
        setResumes({ ...resumes })
    }

    const addBtn = () => {
        resumes.buttons = resumes.buttons.concat({ text: ``, variant: 'contained', _id: '' })
        dispatch(addButton(``, 'contained'))
        setResumes({ ...resumes })
    }

    const createResumesSection = () => {
        dispatch(createResumesFirstDocument())
    }



    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />

    return (
        <div className="w-full h-full "  >
            {
                result.resumesDocumentNotExist
                    ?
                    <div className="w-full h-full flex justify-center items-center  " >
                        <button onClick={createResumesSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create Resumes Section</button>
                    </div>
                    :
                    <div className="flex flex-col gap-[2rem] " >
                        <Heading
                            title="resumes"
                            deleteSection={deleteResumesCollection}
                            initialState={initialResumesState}
                            state={resumes}
                            setState={setResumes}
                        />
                        <div className="flex flex-col gap-[1rem] " >
                            <Textarea
                                heading='Fore Heading'
                                placeholder='Type Here'
                                attribute='forwardHeading'
                                blurFunction={changeForwardHeading}
                                state={resumes}
                                setState={setResumes}
                            />
                            <Textarea
                                heading='Back Heading'
                                placeholder='Type Here'
                                attribute='backHeading'
                                blurFunction={changeBackHeading}
                                state={resumes}
                                setState={setResumes}
                            />
                            <Textarea
                                heading='Detail'
                                placeholder='Type Here'
                                attribute='detail'
                                blurFunction={changeDetail}
                                state={resumes}
                                setState={setResumes}
                            />

                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white " >resumes :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full" >
                                    <p className="capitalize  text-[18px] text-textGray  " >{resumes.resumes.length}</p>

                                    <div className="flex flex-wrap md:flex-row sm:flex-col gap-[1rem] w-full " >
                                        {
                                            resumes.resumes.map((resume, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full " >
                                                    {
                                                        resume._id
                                                            ?
                                                            <ResumeCard resume={resume} />
                                                            :
                                                            <Loading title="Adding Card..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="w-full flex justify-end items-center " >
                                        <button onClick={() => addResumeFunc()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Resume</button>
                                    </div>

                                </div>
                            </div>

                            {/* buttons */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white " >buttons :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full " >
                                    <p className="text-[18px] text-textGray  " >{resumes.buttons.length}</p>
                                    <div className="flex flex-wrap gap-[1rem] lg:flex-row md:flex-col sm:flex-col justify-start " >
                                        {
                                            resumes.buttons?.map((button, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full" >
                                                    {
                                                        button._id
                                                            ?
                                                            <Button
                                                                button={button}
                                                                state={resumes}
                                                                setState={setResumes}
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
                                    <div className="w-full flex justify-end items-center " >
                                        <button onClick={() => addBtn()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Button</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Resumes