import { icons } from '../../../data'

const ContactCard = ({ card }) => (
    <div className={`flex flex-col gap-[8px] justify-between items-center lg:w-[22%] md:w-[46%] sm:w-[46%] w-full  `} >
        <span className="w-[100px] h-[100px] text-[30px] flex justify-center font-black items-center rounded-full bg-darkGray " >
            {icons.map((icon, index) => (
                icon.name.toLowerCase() == card.icon.toLowerCase()
                &&
                <icon.icon key={index} style={{ fontSize: '54px', color: '#feb931' }} />
            ))}
        </span>
        <h3 className="text-[18px] font-medium uppercase tracking-[1px] text-white " >{card.title}</h3>
        <p className="text-textGray items-center  w-auto text-[1.2rem] text-center " >{card.detail}</p>
    </div>
)


export default ContactCard;