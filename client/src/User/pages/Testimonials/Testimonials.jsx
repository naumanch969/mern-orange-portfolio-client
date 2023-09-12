import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

import { MainHeading } from "../../components"
import TestimonialsCard from './TestimonialsCard'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTestimonials } from "../../../redux/actions/testimonial";

import './swiper.css'

const Testimonials = () => {

    ////////////////////////////// VARIABLES //////////////////////////////////////
    const styles = `.swiper-slide {width:300px}`;
    const dispatch = useDispatch()
    const { testimonials } = useSelector(state => state.testimonial)

    ////////////////////////////// STATES /////////////////////////////////////////

    ////////////////////////////// FUNCTIONS ///////////////////////////////////////
    useEffect(() => {
        dispatch(getTestimonials())
    }, [])

    ////////////////////////////// USE EFFECTS ////////////////////////////////////


    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <motion.section
                whileInView={{ opacity: [0, 1] }}
                animate={{ y: [0, 1] }}
                transition={{ duration: .3, delayChildren: .5 }}
                name="testimonials"
                className="flex flex-col mb-[10rem] "
            >

                <div className="w-full flex justify-center " >
                    <MainHeading
                        forwardHeading='testimonials'
                        small
                        backHeading='testimonials'
                        detail='See what my satisfied clients have to say about my services. Partner with me to bring your web projects to life!'
                    />
                </div>

{/* 
                <div className="testimonials">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 0,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        loop={true}
                        modules={[EffectCoverflow]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className="card">
                                <div className="layer"></div>
                                <div className="content">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, deleniti? Saepe iste aliquid sunt corporis fuga iusto odio suscipit architecto, culpa harum alias.</p>
                                    <div className="imgBx">
                                        <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                                    </div>
                                    <div className="details">
                                        <h2>Someone Famous <br /> <span>Website Designer</span> </h2>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div> */}


                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 40,
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
                        testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index} className="w-[300px] " >
                                <TestimonialsCard
                                    content={testimonial.content}
                                    name={testimonial.name}
                                    designation={testimonial.designation}
                                    image={testimonial.image}
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