import { useState } from 'react'
import { VisibilityOff, RemoveRedEye } from '@mui/icons-material'

const Input = ({ type, label, placeholder, attribute, blurFunction, showEyeIcon, formData, setFormData, textarea, light, rows }) => {      // attribute may either of 'email', 'name', 'password', 'confirmPassword'

    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [attribute]: e.target.value })
    }

    const attributes = {
        autoComplete: 'off',
        type: showPassword ? 'text' : type,
        placeholder: placeholder,
        name: attribute,
        value: formData[attribute],
        onChange: handleChange,
        onBlur: blurFunction,
        className: `bg-inherit w-full ${textarea ? 'h-auto ' : 'h-[40px] '} ${light ? 'bg-white text-black ' : 'bg-lightGray text-white'}  border-[1px] border-textGray rounded-[4px] px-[6px] outline-none`,
        required: true
    }

    return (
        <div className="w-full flex flex-col gap-[8px]" >

            {label &&
                <label className={`${light ? 'text-black ' : 'text-white' } capitalize `} >{label}:</label>
            }

            <div className="relative flex flex-col gap-[4px] " >
                {
                    textarea
                        ?
                        <textarea {...attributes} rows={rows} />
                        :
                        <input {...attributes} />
                }
                {showEyeIcon && <button onClick={() => setShowPassword(pre => !pre)} className="absolute right-0 top-[50%] transform translate-y-[-50%] " > {showPassword ? <VisibilityOff /> : <RemoveRedEye />}  </button>}
            </div>



        </div>
    )

}

export default Input