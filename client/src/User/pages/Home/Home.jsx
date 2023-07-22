import { Button } from "../../components"
import { useState } from "react"

const Home = ({ content }) => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [page, setPage] = useState(1)

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////


    return (
        <main name="home" className="w-full flex md:flex-row flex-col gap-[2rem] justify-between lg:p-0 md:p-[1rem] p-[4px] " >

            <div className={` flex-col md:w-[39rem] w-full md:items-start items-center justify-start pt-32 gap-[1.5rem] text-white  `} >
                <h6 className="text-[20px] font-semibold text-center md:text-start  uppercase tracking-[3px] text-orange " >{content?.helloText}</h6>

                <h1 className="md:text-[64px] text-[60px] font-extrabold w-full  leading-[1.1em] md:text-start text-center text-white "  >
                    {content?.heading1}
                </h1>
                <h2 className="md:text-[35px] text-[30px] font-medium md:text-start tracking-[3px] text-center text-white " >
                    {content?.subHeading1}
                </h2>

                <div className="flex md:justify-start justify-center items-center w-full gap-2 my-6 " >
                    {content?.buttons[0] && <Button to='contact' text={content?.buttons[0]?.text} color="black" background="orange" />}
                    {content?.buttons[1] && <Button to='projects' text={content?.buttons[1].text} color="white" background="black" />}
                </div>
            </div>

            <div className={` relative md:w-[50%] flex md:justify-end justify-center w-full z-10 p-[1rem] `} >
                <img src={content?.images[0]?.url} alt="profile-image" className="lg:w-[480px] md:w-[28rem] max-w-full sm:w-[90%] w-[90%] h-[38rem] " style={{ height: '38rem', width: '480px' }} />
            </div>

        </main>
    )
}

export default Home