

const ResumeCard = ({ title, subTitle, detail, year }) => {

    return (
        <div className="flex flex-col justify-start align-start lg:gap-[12px] gap-[8px] lg:w-[45%] md:w-[44%] sm:w-[70%] w-[90%] min-h-[200px] h-auto md:justify-start bg-darkGray border-gray border-[1px] outline-none lg:p-[30px] md:p-[1rem] p-[12px] " >
            <h3 className="text-orange text-[16px] font-medium " >{year}</h3>
            <h3 className="text-white lg:text-[24px] md:text-[20px] text-[18px] " >{title}</h3>
            <p className="text-textGray text-[16px] " >{detail}</p>
            <div className="w-full flex justify-end" >
                <h5 className="text-white text-[16px] " >{subTitle}</h5>
            </div>
        </div>
    )
}

export default ResumeCard