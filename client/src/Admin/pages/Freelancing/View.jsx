import { BrokenImage, Close } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React from "react";

const View = ({ card, open, setOpen }) => {

    ////////////////////////////// VARIABLES //////////////////////////////////////

    ////////////////////////////// STATES /////////////////////////////////////////

    ////////////////////////////// USE EFFECTS ////////////////////////////////////

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////


    return (
        <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >
            <div className="sm:w-[20rem] w-[90%] relative border-textGray border-[1px] rounded-[4px] " >

                <button onClick={() => setOpen(false)} className="absolute top-[5px] right-[5px] rounded-full p-[2px] bg-black " ><Close style={{ fontSize: '20px' }} className="text-white" /></button>

                <div className=" p-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full " >
                    {
                        card?.image
                            ?
                            <img src={card?.image} alt="image" style={{ width: '6rem', height: '6rem' }} className="w-[6rem] h-[6rem] " />
                            :
                            <BrokenImage />
                    }
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-textGray `}>Title:</h6>
                        <p className={` text-[16px] text-white text-start w-full min-w-[10rem] max-w-[100%]  `} >
                            {card?.title}
                        </p>
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-textGray `}>Description:</h6>
                        <p className={` text-[16px] text-white text-start w-full min-w-[10rem] max-w-[100%]  `} >
                            {card?.description}
                        </p>
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-textGray `}>Link:</h6>
                        <p className={` text-[16px] text-white text-start w-full min-w-[10rem] max-w-[100%]  `} >
                            {card?.link}
                        </p>
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-textGray `}>Parent:</h6>
                        <p className={` text-[16px] text-white text-start w-full min-w-[10rem] max-w-[100%]  `} >
                            {card?.parent}
                        </p>
                    </div>
                    <div className={`flex flex-col `}  >
                        <h6 className={`capitalize w-full text-[16px] text-textGray `}>Category:</h6>
                        <p className={` text-[16px] text-white text-start w-full min-w-[10rem] max-w-[100%]  `} >
                            {card?.category}
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default View;