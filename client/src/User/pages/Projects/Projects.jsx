import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MainHeading } from "../../components";
import ProjectCard from "./Project"; // Import your ProjectCard component
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../redux/actions/project";
import Pagination from "@mui/material/Pagination";
import './pagination.css'

const Projects = () => {
    ////////////////////////////// VARIABLES //////////////////////////////////////
    const dispatch = useDispatch();
    const { projects } = useSelector((state) => state.project);
    const projectsPerPage = 9; // Number of projects per page
    const [currentPage, setCurrentPage] = useState(1);

    ////////////////////////////// STATES /////////////////////////////////////////

    ////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        dispatch(getProjects());
    }, []);

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(
        indexOfFirstProject,
        indexOfLastProject
    );

    return (
        <motion.section
            whileInView={{ opacity: [0, 1] }}
            animate={{ y: [0, 1] }}
            transition={{ duration: 0.3, delayChildren: 0.5 }}
            name="projects"
            className="h-auto w-full flex flex-col"
        >
            <div className="w-full flex justify-center">
                <MainHeading
                    forwardHeading="Projects"
                    backHeading="Projects"
                    detail="Transforming complex ideas into functional and intuitive web solutions that address unique needs and exceed user expectations with the latest web technologies and frameworks"
                />
            </div>


            <div className="flex flex-col gap-[1rem] ">
                <div className="flex flex-wrap md:justify-center justify-center gap-[1rem] mt-[3rem] sm:p-0 p-[2rem] ">
                    {currentProjects.map((project, index) => (
                        <ProjectCard project={project} index={index} key={index} />
                    ))}
                </div>
                {
                    projects.length > projectsPerPage &&
                    <div className="w-full flex justify-center items-center">
                        <Pagination
                            count={Math.ceil(projects.length / projectsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </div>
                }
            </div>

        </motion.section>
    );
};

export default Projects;
