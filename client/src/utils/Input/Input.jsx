import { useState } from 'react'
import { VisibilityOff, RemoveRedEye } from '@mui/icons-material'

const Input = ({ type, placeholder, attribute, blurFunction, showEyeIcon, formData, setFormData,  textarea, rows }) => {      // attribute may either of 'email', 'name', 'password', 'confirmPassword'

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
        className: 'bg-inherit w-full text-textGray border-b-[1px] border-textGray p-[6px] outline-none pl-0',
        required: true
    }

    return (
        <div className="w-full flex flex-col gap-[4px]" >

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