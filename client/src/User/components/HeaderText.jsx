import Button from "./Button"
import { motion } from "framer-motion"
import { Link } from "react-scroll"



const HeaderText = ({ first }) => {

    return (
        <motion.div
            whileInView={{ opacity: [0, 1] }}
            animate={{ y: [0, 1] }}
            transition={{ duration: .3, delayChildren: .5 }}
            className={`w-full md:w-[50%] opacity-[1] z-50 `}
        >
            <div className={` flex-col md:w-[39rem] w-full md:items-start items-center justify-start pt-32 gap-6 text-white  `} >
                <h6 className="text-[20px] font-semibold text-center md:text-start  uppercase tracking-[3px] text-orange " >Hello!</h6>

                {
                    first ?
                        <>
                            <h1 className="md:text-[64px] text-[60px] font-extrabold w-full  leading-[1.1em]   md:text-start text-center "  >
                                I'm <span className="text-orange leading-[1.2] " > Nauman Chaudhry </span>
                            </h1>
                            <h2 className="md:text-[35px] text-[30px] font-medium md:text-start tracking-[3px] text-center " >A Freelance Web Designer</h2>
                        </>
                        :
                        <>
                            <h1 className="md:text-[64px] text-[60px] font-extrabold w-full leading-[1.1em] md:text-start text-center  "   >
                                I'm a <span className="text-orange leading-[1.2] " >MERN stack developer</span> based in Lahore.
                            </h1>
                        </>
                }


                <div className="flex md:justify-start justify-center items-center w-full gap-2 my-6 " >
                    <Button text="Contact Me" color="black" background="orange" />
                    <Link to="projects" text="My Works" color="white" background="black" />
                </div>
            </div>
        </motion.div>
    )
}


export default HeaderText;