
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import FileBase64 from 'react-file-base64'

import { Heading, Button, ImageCard, Textarea, Error } from "../../components"
import { Loading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import { getHomeContent, updateHelloText, updateHeading1, updateHeading2, updateSubHeading1, updateButton, addButton, addImage, deleteButton, deleteImage, createHomeFirstDocument, deleteHomeCollection } from '../../../store/actions/admin/home'

const Home = () => {
    const { initialHomeState, home, setHome } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { result, isLoading, isError, error } = useSelector(state => state.home)
    const fileBase64Ref = useRef(null)
    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getHomeContent())
    }, [])
    useEffect(() => {
        setHome({ ...home, ...result })
    }, [result])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    const changeHelloText = (text) => {
        home.helloText = text
        dispatch(updateHelloText(text))
        setHome({ ...home })
    }
    const changeHeading1 = (text) => {
        home.heading1 = text
        dispatch(updateHeading1(text))
        setHome({ ...home })
    }
    const changeHeading2 = (text) => {
        home.heading2 = text
        dispatch(updateHeading2(text))
        setHome({ ...home })
    }
    const changeSubHeading1 = (text) => {
        home.subHeading1 = text
        dispatch(updateSubHeading1(text))
        setHome({ ...home })
    }
    const addBtn = () => {
        home.buttons = home.buttons.concat({ text: ``, variant: 'contained', _id: '' })
        dispatch(addButton(``, 'contained'))
        setHome({ ...home })
    }
    const handleImageButtonClick = () => {
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }
    const addImageFunc = (files) => {
        const uploaded = [...home.images]
        files.some((file) => {
            const { name, size, type, base64 } = file
            const url = base64
            dispatch(addImage({ name, size, type }, url));
            uploaded.concat({ file: { name, size, type }, url });
        })
        setHome({ ...home, images: uploaded })
    }


    const createHomeSection = () => {
        dispatch(createHomeFirstDocument())
    }


    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />

    return (
        <div className="w-full h-full "  >
            {
                result.homeDocumentNotExist
                    ?
                    <div className="w-full h-full flex justify-center items-center  " >
                        <button onClick={createHomeSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create Home Section</button>
                    </div>
                    :
                    <div className="flex flex-col gap-[2rem] " >

                        <Heading
                            title="Home"
                            deleteSection={deleteHomeCollection}
                            initialState={initialHomeState}
                            state={home}
                            setState={setHome}
                        />
                        <div className="flex flex-col gap-[1rem] " >
                            <Textarea
                                state={home}
                                setState={setHome}
                                blurFunction={changeHelloText}
                                placeholder='Type Here'
                                attribute='helloText'
                                heading='Hello Text'
                            />
                            <Textarea
                                state={home}
                                setState={setHome}
                                blurFunction={changeHeading1}
                                placeholder='Type Here'
                                attribute='heading1'
                                heading='Heading 1'
                            />
                            <Textarea
                                state={home}
                                setState={setHome}
                                blurFunction={changeHeading2}
                                placeholder='Type Here'
                                attribute='heading2'
                                heading='Heading 2'
                            />
                            <Textarea
                                state={home}
                                setState={setHome}
                                blurFunction={changeSubHeading1}
                                placeholder='Type Here'
                                attribute='subHeading1'
                                heading='Sub Heading 1'
                            />

                            {/* images */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full  text-[18px] text-white " >images :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full" >
                                    <p className="text-[18px] text-textGray  " >{home.images.length}</p>
                                    <div className="flex flex-wrap lg:flex-row md:flex-col sm:flex-col gap-[1rem] " >
                                        {
                                            home.images.map((image, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full" >
                                                    {
                                                        image._id
                                                            ?
                                                            <ImageCard
                                                                key={index}
                                                                image={image}
                                                                state={home}
                                                                setState={setHome}
                                                                deleteImage={deleteImage}
                                                            />
                                                            :
                                                            <Loading title="Addding Image..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div ref={fileBase64Ref} id="filebase_image" className=" " >
                                        <button onClick={() => handleImageButtonClick()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit " >Add Image</button>
                                        {/* filebase64 component have display none */}
                                        <FileBase64
                                            type="file"
                                            multiple={true}
                                            onDone={(filesArr) => {
                                                addImageFunc(filesArr)
                                            }
                                            }
                                        />
                                    </div>

                                </div>
                            </div>


                            {/* buttons */}
                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-full text-[18px] text-white " >buttons :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full" >
                                    <p className="text-[18px] text-textGray  " >{home.buttons.length}</p>
                                    <div className="flex flex-wrap gap-[1rem] lg:flex-row md:flex-col sm:flex-col " >
                                        {
                                            home.buttons?.map((button, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full" >
                                                    {
                                                        button._id
                                                            ?
                                                            <Button
                                                                button={button}
                                                                state={home}
                                                                setState={setHome}
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
                                    <button onClick={() => addBtn()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Button</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Home