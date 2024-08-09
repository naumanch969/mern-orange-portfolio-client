import { Loading } from './'
import FileBase64 from 'react-file-base64'
import { ArrowLeft, Camera, ArrowRight, Add, Delete } from '@mui/icons-material'
import { useState, useEffect, useRef } from 'react'

const Slider = ({ images, deleteImageFunc, addImageFunc, sliderInModal, subFreelancingCardId }) => {

    const imagesLength = images.length
    ////////////////////////////// VARIABLES //////////////////////////////////////
    const fileBase64Ref = useRef(null)

    ////////////////////////////// STATES /////////////////////////////////////////
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    ////////////////////////////// USE EFFECTS ////////////////////////////////////


    ////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const nextImage = () => {
        const isLastImage = currentImageIndex == imagesLength - 1
        isLastImage
            ?
            setCurrentImageIndex(0)
            :
            setCurrentImageIndex(currentImageIndex + 1)
    }

    const prevImage = () => {
        const isFirstImage = currentImageIndex == 0
        isFirstImage
            ?
            setCurrentImageIndex(imagesLength - 1)
            :
            setCurrentImageIndex(currentImageIndex - 1)
    }

    const handleImageButtonClick = () => {
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }

    const addImage = (files) => {
        subFreelancingCardId
            ?
            addImageFunc(subFreelancingCardId, files)
            :
            addImageFunc(files)

    }
    const deleteImage = () => {
        subFreelancingCardId
            ?
            deleteImageFunc(subFreelancingCardId, images[currentImageIndex]._id)
            :
            deleteImageFunc(images[currentImageIndex]._id)
    }

    return (
        <div className="relative w-full h-full ">
            {images.length > 1 && <button onClick={prevImage} className="cursor-pointer absolute transform translate-y-[-100%] top-[50%] left-0 " ><ArrowLeft style={{ fontSize: '30px' }} className="text-black text-[30px] " /></button>}
            <div className="w-full h-full " >
                {
                    sliderInModal &&
                    <>
                        <div ref={fileBase64Ref} id="filebase_image" className="absolute top-[4px] right-[4px] w-fit h-fit flex justify-center items-center " >
                            <button onClick={() => handleImageButtonClick()} className=" flex flex-col justify-center items-center text-white  " >
                                <Add />
                            </button>
                            <FileBase64 type="file" multiple={true} onDone={(filesArr) => addImage(filesArr)} />
                        </div>
                        <button onClick={deleteImage} className="absolute bottom-[4px] right-[4px] text-white   " ><Delete /></button>
                    </>
                }
                <img src={images[currentImageIndex]} alt='' className="w-full h-full " />
            </div>
            {images.length > 1 && <button onClick={nextImage} className="cursor-pointer absolute transform translate-y-[-100%] top-[50%] right-0 " ><ArrowRight style={{ fontSize: '30px' }} className="text-black text-[30px] " /></button>}
        </div>
    )
}
export default Slider;