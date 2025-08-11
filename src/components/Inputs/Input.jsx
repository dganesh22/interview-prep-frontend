import React, {useState} from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'


function Input(props) {
    const { value, onChange, type, label, placeholder } = props
    const [show,setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    return (
        <div className={""}>
            <label className="text-md font-semibold text-slate-800">{ label } </label>
            <div className="input-box">
                <input type={type === "password" ? (show ? "text" : "password"): type}
                       placeholder={placeholder}
                       value={value}
                       onChange={(e) => onChange(e)}
                       className="w-full bg-transparent outline-none text-md"
                />
                {
                    type === "password" &&  (
                        <>
                            {
                                show ? (
                                    <FaRegEye size={22} className="text-primary cursor-pointer" onClick={() => toggleShow()} />
                                ): (
                                    <FaRegEyeSlash size={22} className="text-gray-400 cursor-pointer" onClick={() => toggleShow()} />
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Input
