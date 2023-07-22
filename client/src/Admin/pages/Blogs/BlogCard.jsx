import { Clear, Camera, Delete, Add } from "@mui/icons-material"
import { Slider } from '../../components'
import { Modal } from '@mui/material'
import { useState, useRef } from "react"
import { updateBlog, deleteBlog, addBlogImage, deleteBlogImage } from '../../../store/actions/admin/blogs'
import { useDispatch } from "react-redux"
import { useStateContext } from "../../../contexts/ContextProvider"
import { limitText } from '../../../utils/functions'
import TextareaAutosize from "react-textarea-autosize"
import FileBase64 from 'react-file-base64'

const BlogCard = ({ blog }) => {

    const { blogs, setBlogs } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const fileBase64Ref = useRef(null)
    const dateTimeRef = useRef(null)
    const dispatch = useDispatch()
    const findedImages = blog.images.filter(i => i.url !== '')

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [openModal, setOpenModal] = useState(false)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////



    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////
    const updateBlogFunc = () => {
        dispatch(updateBlog(blog._id, blog))
        setBlogs({ ...blogs })
        setOpenModal(false)
    }
    const dateClick = () => {
        dateTimeRef.current.querySelector('input[type="datetime-local"]').click();
    }


    const handleImageButtonClick = () => {
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }
    const addImageFunc = (files) => {
        const uploaded = [...blog.images]
        files.some((file) => {      // file is an object
            const { name, size, type, base64 } = file
            const url = base64
            uploaded.push({ file: { name, size, type }, url });
        })
        blog.images = uploaded
        setBlogs({ ...blogs })
    }
    const deleteBlogImageFunc = (imageId) => {
        blog.images = blog.images.filter((img) => img._id !== imageId)
        setBlogs({ ...blogs })
    }


    const deleteBlogFunc = () => {
        dispatch(deleteBlog(blog._id))
        setBlogs({ ...blogs, blogs: blogs.blogs.filter((b) => b._id !== blog._id) })
        setOpenModal(false)
    }
    const handleChange = (e) => {
        blog[e.target.name] = e.target.value
        setBlogs({ ...blogs })
    }


    return (
        <>
            <div className="relative p-[8px] rounded-[4px] bg-darkGray w-full h-full ">





                <div className=" relative flex flex-col justify-between gap-[6px] w-full h-full " >
                    {/* image, title and description */}
                    <div className="flex flex-col justify-start  " >
                        {/* image */}
                        {
                            findedImages.length
                                ?
                                <div className="relative h-[12rem] w-full " >
                                    <Slider images={findedImages} />
                                </div>
                                :
                                <div ref={fileBase64Ref} id="filebase_image" className="w-full h-[180px] flex justify-center items-center " >
                                    <button onClick={() => handleImageButtonClick()} className="flex flex-col justify-center items-center  " >
                                        <Camera /> Add Photo
                                    </button>
                                    <FileBase64 type="file" multiple={true} onDone={(filesArr) => { addImageFunc(filesArr) }} />
                                </div>
                        }
                        {/* title and description */}
                        <div onClick={() => setOpenModal(true)} className="flex flex-col gap-[8px] cursor-pointer " >
                            <p className="text-[14px] text-textGray capitalize text-start w-full " >{blog.date}</p>
                            <div className="flex flex-col gap-[4px] " >
                                <p className="text-[20px] text-white capitalize text-start w-full " >{blog.title}</p>
                                <p className="text-[14px] text-textGray capitalize text-start w-full " >{limitText(blog.description, 120)}</p>
                            </div>
                        </div>
                    </div>
                    {/* name of author */}
                    <p className="text-[12px] text-textGray capitalize text-end w-full " >{blog.name}</p>
                </div>


            </div>


            <Modal open={openModal} onClose={() => { setOpenModal(false); updateBlogFunc() }}            >

                <div className="max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[90%]" >
                    <div className=" p-[2rem] bg-darkGray flex flex-col gap-[1rem] w-full " >

                        {
                            findedImages.length
                                ?
                                <div className="relative h-[12rem] w-full " >
                                    <Slider images={findedImages} deleteImageFunc={deleteBlogImageFunc} addImageFunc={addImageFunc} sliderInModal />
                                </div>
                                :
                                <div ref={fileBase64Ref} id="filebase_image" className="w-full min-h-[10rem] max-h-[12rem] flex justify-center items-center " >
                                    <button onClick={() => handleImageButtonClick()} className="flex flex-col justify-center items-center text-textGray  " >
                                        <Camera /> Add Photo
                                    </button>
                                    <FileBase64 type="file" multiple={true} onDone={(filesArr) => { addImageFunc(filesArr) }} />
                                </div>
                        }

                        <div ref={dateTimeRef} id="filebase_image" className="w-full flex flex-col" >
                            <button onClick={() => dateClick()} className={`border-none bg-inherit outline-none text-textGray text-start w-fit `}                        >{blog.date}</button>
                            {/* <input
                                type="datetime-local"
                                onChange={(e) => changeBlogDate(e.target.value)}
                                className={`border-none resize-none bg-inherit outline-none w-[200px] text-textGray  `}
                            /> */}
                        </div>

                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Blog Title'
                            name='title'
                            value={blog.title}
                            onChange={handleChange}
                            className={`border-none resize-none bg-inherit outline-none text-[24px] text-white capitalize text-start w-full min-w-[10rem] max-w-[100%]   `}
                        />
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Blog Description'
                            value={blog.description}
                            name='description'
                            onChange={handleChange}
                            className={`border-none resize-none bg-inherit outline-none text-[14px] text-textGray capitalize text-start w-full min-w-[10rem] max-w-[100%]  `}
                        />
                        <TextareaAutosize
                            minRows={1}
                            maxRows={2}
                            type='text'
                            autoComplete='off'
                            placeholder='Blog Author'
                            value={blog.name}
                            name='name'
                            onChange={handleChange}
                            className={`border-none resize-none bg-inherit outline-none text-[12px] text-textGray capitalize text-start w-full min-w-[10rem] max-w-[100%]  `}
                        />
                        <div className='w-full flex justify-between items-center'>
                            <button onClick={deleteBlogFunc} className="bg-[#0d0d0d] text-white rounded-full px-[8px] py-[4px]"><Delete style={{ fontSize: '20px' }} className="" /><span className="" >Delete</span></button>
                            <button onClick={updateBlogFunc} className="bg-orange text-white rounded-full px-[8px] py-[4px]" >Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default BlogCard;