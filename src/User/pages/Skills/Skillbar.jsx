

const Skillbar = ({ skill }) => {

    return (
        <div className="lg:w-[45%] md:w-[70%] sm:w-[70%] w-[90%] flex flex-col gap-[.5rem] " >
            <div className="flex justify-between item-center w-full " >
                <h4 className="font-medium text-white text-xl " >{skill.skill}</h4>
                <h4 style={{ right: `${100 - skill.percentage}%` }} className={`relative  font-medium text-xl text-white `}  >{skill.percentage}%</h4>
            </div>
            <div className="relative h-[10px] w-full bg-darkGray " >
                <span style={{ width: `${skill.percentage}%` }} className={`absolute h-full w-[${skill.percentage}%] rounded-[2px] bg-orange left-0 top-0 `} />
            </div>
        </div>
    )
}

export default Skillbar;