import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

import { MainHeading } from "../../components"
import TestimonialsCard from './TestimonialsCard'

const Testimonials = ({ content }) => {

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const styles = `
    .swiper-slide {
     width:300px
    }
  `;

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////


    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <motion.section
                whileInView={{ opacity: [0, 1] }}
                animate={{ y: [0, 1] }}
                transition={{ duration: .3, delayChildren: .5 }}
                name="testimonials"
                className="flex flex-col "
            >

                <div className="w-full flex justify-center " >
                    <MainHeading
                        forwardHeading={content?.forwardHeading}
                        backHeading={content?.backHeading}
                        detail={content?.detail}
                    />
                </div>


                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="w-full py-[50px] "
                >
                    {
                        content?.testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index} className="w-[300px] " >
                                <TestimonialsCard
                                    content={testimonial.content}
                                    name={testimonial.name}
                                    designation={testimonial.designation}
                                    image={testimonial.image.url}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

            </motion.section>

        </>
    )
}

export default Testimonials