import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import { MainHeading } from "../../components"
import BlogCard from './BlogCard'



const Blogs = ({ content }) => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    return (
        <motion.section
            whileInView={{ opacity: [0, 1] }}
            animate={{ y: [0, 1] }}
            transition={{ duration: .3, delayChildren: .5 }}
            name="blog"
            className="h-auto w-full flex flex-col "
        >

            <div className="w-full flex justify-center " >
                <MainHeading
                    forwardHeading={content?.forwardHeading}
                    backHeading={content?.backHeading}
                    detail={content?.detail}
                />
            </div>

            <Swiper
                breakpoints={{
                    360: {
                        slidesPerView: 1,
                    },
                    480: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                slidesPerView={3}
                pagination={true}
                modules={[Pagination]}
                className="w-full"
            >
                {
                    content?.blogs.map((blog, index) => (
                        <SwiperSlide key={index} className="p-[1rem] flex justify-center " >
                            <BlogCard blog={blog} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </motion.section>
    )
}

export default Blogs

