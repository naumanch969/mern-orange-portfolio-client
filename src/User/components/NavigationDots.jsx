import { Link } from 'react-scroll'


const NavigationDots = () => {
    return (
        <>
            {
                links.map((item, index) => (
                    <Link
                        key={index}
                        id="link"
                        to={item}
                        activeClass="activeBullet"
                        smooth={true}
                        spy={true}
                        offset={-100}
                        duration={300}
                        className="text-light-white w-[15px] h-[15px] rounded-full bg-darkGray cursor-pointer   hover:bg-orange hover:scale-110 duration-50 "
                    >
                        {item.title}
                    </Link>
                ))
            }
        </>
    )
}

export default NavigationDots

const links = [
    'home',
    'about',
    'resume',
    'services',
    'skills',
    'projects',
    'blog',
    'testimonials',
    'contact'
]