import { Button } from "../../components"
import { profile } from "../../../assets"
import { Link } from "react-scroll"

const Home = () => {

    ////////////////////////////// VARIABLES //////////////////////////////////////

    ////////////////////////////// STATES /////////////////////////////////////////

    ////////////////////////////// USE EFFECTS ////////////////////////////////////

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////


    return (
        <main name="home" className="w-full flex lg:flex-row flex-col gap-[2rem] justify-between lg:p-0 md:p-[1rem] p-[4px] " >

            <div className={` flex-col lg:w-[39rem] w-full lg:items-start items-center justify-start pt-32 gap-[1.5rem] text-white  `} >
                <h6 className="text-[20px] font-semibold text-center lg:text-start  uppercase tracking-[3px] text-orange " >Hey</h6>

                <h1 className="md:text-[5.5rem] text-[60px] font-extrabold w-full leading-[1.1em] lg:text-start text-center text-white "  >
                    I'm <span className="text-orange " >Nauman Chaudhry</span>
                </h1>
                <h2 className="lg:text-[35px] text-[30px] font-medium lg:text-start tracking-[3px] text-center text-white " >
                    A Freelance MERN Stack Developer
                </h2>

                <div className="flex lg:justify-start justify-center items-center w-full gap-2 my-6 " >
                    <Link to='contact' className={`font-['PoppinsRegular'] bg-orange text-black cursor-pointer border-white border-[1px] font-semibold rounded-[40px] px-[1.5rem] tracking-[1.2] py-[1rem] w-fit h-fit `}>
                        Contact Me
                    </Link>
                    <Link to='projects' className={`font-['PoppinsRegular'] bg-black text-white cursor-pointer border-white border-[1px] font-normal rounded-[40px] px-[1.5rem] tracking-[1.2] py-[1rem] w-fit h-fit `}>
                        My Work
                    </Link>
                </div>
            </div>

            <div className={` relative lg:w-[50%] flex lg:justify-end justify-center w-full z-10 p-[1rem] `} >
                <img src={profile} alt="profile-image" className=" lg:w-full max-w-full sm:w-[90%] w-[90%] h-[38rem] " />
            </div>

        </main>
    )
}

export default Home