

const MainHeading = ({ forwardHeading, backHeading, detail, alignStart }) => {

    return (
        <div className={`flex relative md:w-full sm:w-[80%] w-[90%] ${alignStart ? 'md:items-start items-center ' : 'items-center  '} flex-col  `} >
            {/* backHeading */}
            <h1 className={` md:text-[100px] sm:text-[70px] text-[52px] font-black capitalize h-[9rem] z-0 absolute top-0 ${backHeading == 'Testimonials' && 'text-[52px]'} ${alignStart ? 'left-[5%px]' : 'left-[50%] right-[50%] flex justify-center items-center'} text-darkGray `} >{backHeading}</h1>
            {/* forwardHeading */}
            <h2 className="text-[50px] font-bold  mb-[1.5rem] z-10 capitalize  text-white " >{forwardHeading}</h2>
            {/* text */}
            <p className={`font-normal z-10  mb-4 text-gray mt-[10px] ${alignStart ? 'md:px-[0px] md:text-start text-center mt-[2rem] ' : 'md:px-[100px] px-[30px] text-center '}  `} >
                {alignStart
                    ?
                    <span className="flex flex-col gap-[1rem] " >
                        {detail?.split('||').map((detail, index) => (
                            <span key={index} className="" >{detail}</span>
                        ))}
                    </span>
                    :
                    detail
                }
            </p>
        </div>
    )
}

export default MainHeading;