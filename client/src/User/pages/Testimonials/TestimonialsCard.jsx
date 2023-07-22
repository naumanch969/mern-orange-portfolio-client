import { FormatQuote } from "@mui/icons-material"

const TestimonialsCard = ({ content, name, designation, image }) => {
    return (
        <div className="flex justify-between bg-darkGray flex-col p-4 pb-8 rounded-[20px] h-auto w-full  md:mr-10 sm:mr-5 mr-0 my-5 feedback-card " >

            <FormatQuote style={{ fontSize: '5rem' }} className=" object-contain text-[5rem] text-white " />

            <p className="font-poppins font-normal text-[18px] min-h-[5rem]  pr-4 text-white my-4 leading-[23px] " >
                {content}
            </p>

            <div className="flex flex-col items-center  " >
                <img src={image} alt={name} className="w-[48px] h-[48px] rounded-full " />
                <div className="flex flex-col items-center ml-4" >
                    <h4 className="font-poppins font-semibold text-[20px] text-white leading-[32px] " >{name}</h4>
                    <p className="font-poppins font-[100] text-[12px] text-textGray text-dimWhite leading-[24px] " >{designation}</p>
                </div>
            </div>
        </div>
    )
}

export default TestimonialsCard
