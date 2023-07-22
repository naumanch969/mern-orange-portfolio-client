import { icons } from '../../data'
import { motion } from 'framer-motion'

const SocialMedia = ({ content }) => {

    return (
        <>
            {
                content?.socialMedia.map((socialMedia, index) => (
                    <motion.a
                        whileHover={{ scale: [1, 1.2], duration: 200 }}
                        href={socialMedia}
                        target="_blank"
                        key={index}
                        className="flex justify-center items-center text-white hover:bg-black hover:text-orange w-[3rem] h-[3rem] rounded-full"
                    >
                        {icons.map((icon, index) => (
                            icon.name.toLowerCase() == socialMedia.name.toLowerCase()
                            &&
                            <icon.icon key={index} style={{ fontSize: '32px' }} />
                        ))}
                    </motion.a>
                ))
            }
        </>
    )
}

export default SocialMedia;