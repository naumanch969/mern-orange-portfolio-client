import React from "react"
import { Brush, Code, Search } from "@mui/icons-material"
import { icons } from "../../../data"


const service = ({ service }) => {


    return (
        <div className="swiper_card relative md:w-[30%] sm:w-[48%] w-[80%] h-[250px] bg-[#2e2e2e] flex justify-center items-center "  >
            <div className="content">
                <div className="icon">
                    {icons.map((icon, index) => (
                        icon.name.toLowerCase() == service.icon.toLowerCase()
                        &&
                        <icon.icon key={index} style={{ fontSize: '54px' }} />
                    ))}
                </div>
                <div className="text">
                    <h3>{service.service}</h3>
                    {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, illo.</p> */}
                    {/* <a href="#">Read More</a> */}
                </div>
            </div>
        </div>

    )
}

export default service