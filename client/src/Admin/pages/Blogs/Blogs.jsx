
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { Heading, Button, ImageCard, Textarea, Error } from "../../components"
import BlogCard from './BlogCard'
import { Loading } from '../../../utils/Components'
import { useStateContext } from '../../../contexts/ContextProvider'
import { getBlogsContent, updateForwardHeading, updateBackHeading, updateDetail, addBlog, addBlogImage, deleteBlogImage, createBlogsFirstDocument, deleteBlogsCollection } from '../../../store/actions/admin/blogs'

const Blogs = () => {
    const { initialBlogsState, blogs, setBlogs, formattedDateTime } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { result, isLoading, isError, error } = useSelector(state => state.blogs)

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getBlogsContent())
    }, [])
    useEffect(() => {
        setBlogs({ ...blogs, ...result })
    }, [result])



    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    // forward heading
    const changeForwardHeading = (text) => {
        dispatch(updateForwardHeading(text))
    }
    // back heading
    const changeBackHeading = (text) => {
        dispatch(updateBackHeading(text))
    }
    // back heading
    const changeDetail = (text) => {
        dispatch(updateDetail(text))
    }

    const addBlogFunc = () => {
        const blogData = { title: 'title', description: 'lorem ipsum dolar consector lorem ipsum dolar consecto ibsin tokeod', name: 'lorem ipsum', date: formattedDateTime, images: [] }
        blogs.blogs = blogs.blogs.concat({ ...blogData, _id: '' })
        dispatch(addBlog(blogData))
        setBlogs({ ...blogs })
    }

    const createBlogsSection = () => {
        dispatch(createBlogsFirstDocument())
    }



    if (isLoading) return <Loading />
    if (isError) return <Error error={error?.message} />

    return (
        <div className="w-full h-full "  >
            {
                result.blogsDocumentNotExist
                    ?
                    <div className="w-full h-full flex justify-center items-center  " >
                        <button onClick={createBlogsSection} className="bg-orange px-[24px] py-[12px] rounded-[24px] " >Create Blogs Section</button>
                    </div>
                    :
                    <div className="flex flex-col gap-[2rem] " >

                        <Heading
                            title="blogs"
                            deleteSection={deleteBlogsCollection}
                            initialState={initialBlogsState}
                            state={blogs}
                            setState={setBlogs}
                        />
                        <div className="flex flex-col gap-[1rem] " >

                            <Textarea
                                heading='Fore Heading'
                                placeholder='Type Here'
                                attribute='forwardHeading'
                                blurFunction={changeForwardHeading}
                                state={blogs}
                                setState={setBlogs}
                            />
                            <Textarea
                                heading='Back Heading'
                                placeholder='Type Here'
                                attribute='backHeading'
                                blurFunction={changeBackHeading}
                                state={blogs}
                                setState={setBlogs}
                            />
                            <Textarea
                                heading='Detail'
                                placeholder='Type Here'
                                attribute='detail'
                                blurFunction={changeDetail}
                                state={blogs}
                                setState={setBlogs}
                            />

                            <div className="flex sm:flex-row flex-col " >
                                <h6 className="capitalize lg:w-[20%] md:w-[25%] sm:w-[30%] w-[30%] text-[18px] text-white " >blogs :</h6>
                                <div className="flex flex-col gap-[1rem] lg:w-[80%] md:w-[75%] sm:w-[70%] w-full " >
                                    <p className="capitalize  text-[18px] text-textGray  " >{blogs.blogs.length}</p>

                                    <div className="flex flex-wrap md:flex-row sm:flex-col gap-[1rem] w-full " >
                                        {
                                            blogs.blogs.map((blog, index) => (
                                                <div key={index} className="xl:w-[32%] lg:w-[48%] md:w-[48%] sm:w-[80%] w-full " >
                                                    {
                                                        blog._id
                                                            ?
                                                            <BlogCard blog={blog} />
                                                            :
                                                            <Loading title="Adding Card..." />
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="w-full flex justify-end items-center " >
                                        <button onClick={() => addBlogFunc()} className="rounded-full bg-darkGray py-[4px] px-[12px] w-fit" >Add Blog</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Blogs

