

const MainHeading = ({ forwardHeading, backHeading, detail, alignStart, small }) => {

    return (
        <div className={`flex relative md:w-full sm:w-[80%] w-[90%] ${alignStart ? 'lg:items-start items-center ' : 'items-center  '} flex-col  `} >
            {/* backHeading */}
            <h1 className={`text-darkGray md:text-[100px] sm:text-[70px] text-[52px] font-black capitalize h-[10rem] z-0 absolute top-0 ${backHeading == 'Testimonials' && 'text-[52px]'} ${alignStart ? 'left-[5%px]' : 'left-[50%] right-[50%] flex justify-center items-center'}  `} >{backHeading}</h1>
            {/* forwardHeading */}
            <h2 className={`fon-['PoppinsRegular'] ${small ? 'text-[3.4rem] ' : 'text-[4rem] '} text-[4rem] font-bold  mb-[1.5rem] z-10 capitalize  text-white `}>{forwardHeading}</h2>
            {/* text */}
            <p className={`font-normal z-10  mb-4 text-gray mt-[10px] ${alignStart ? 'md:px-[0px] lg:text-start text-center mt-[2rem] ' : 'md:px-[100px] px-[30px] text-center w-[80%] '}  `} >
                {alignStart
                    ?
                    <span className="flex flex-col gap-[1rem] " >
                        {detail?.split('<br/>').map((detail, index) => (
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