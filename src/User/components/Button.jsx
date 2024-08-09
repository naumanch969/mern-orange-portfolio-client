import { Link } from 'react-scroll'

const Button = ({ to, text, color, background, onClick, border, disabled }) => {

    return (
        <Link onClick={onClick} disabled={disabled} to={to || ''} className={`bg-${background} text-${color} ${disabled && 'bg-gray cursor-default '} cursor-pointer border-${border} border-[1px] font-normal rounded-[40px] px-[1.5rem] tracking-[1.2] py-[1rem] w-fit h-fit `}>
            {text}
        </Link>
    )
}

export default Button;