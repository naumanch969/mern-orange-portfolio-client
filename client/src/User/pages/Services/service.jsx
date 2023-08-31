import React from "react"
import './service.css'
import { Brush, Code, Search } from "@mui/icons-material"


const service = () => {
    return (
        <div className="container" >

            <div className="box"  >
                <div className="content">
                    <div className="icon">
                        <Brush />
                    </div>
                    <div className="text">
                        <h3>Designing</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, illo.</p>
                        <a href="#">Read More</a>
                    </div>
                </div>
            </div>

            {/* <div className="box" style="--clr:#eb5ae5" >
                <div className="content">
                    <div className="icon">
                        <Code />
                    </div>
                    <div className="text">
                        <h3>Development</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, illo.</p>
                        <a href="#">Read More</a>
                    </div>
                </div>
            </div>

            <div className="box" style="--clr:#5b98eb" >
                <div className="content">
                    <div className="icon">
                        <Search />
                    </div>
                    <div className="text">
                        <h3>SEO</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, illo.</p>
                        <a href="#">Read More</a>
                    </div>
                </div>
            </div> */}


        </div>
    )
}

export default service