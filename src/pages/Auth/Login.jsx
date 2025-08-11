import React, {useState} from 'react'
import {useNavigate} from "react-router";
import Input from "../../components/Inputs/Input.jsx";
import {validateEmail} from "../../util/helper.js";

function Login(props) {
    const { setCurrentPage } = props
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errors,setErrors] = useState(null)

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)) {
            setErrors("please enter valid email address")
            return
        }

        if(!password) {
            setErrors("please enter password")
            return
        }

        setErrors("")
        
        // login api call
        try {
            
        }catch (err) {
            if(err.response && err.response.data.message) {
                setErrors(err.response.data.message)
            } else {
                setErrors("Something went wrong, please try again")
            }
        }
    }
  return (
    <div className={"w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center"}>
        <h3 className="text-lg font-semibold text-black">Welcome back,</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Please enter your details to login
        </p>

        <form autoComplete="off" method={"post"} onSubmit={handleLogin}>
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label={"Your email address"}
                placeholder={"john@gmail.com"}
                type={"email"}
            />
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label={"Your password"}
                placeholder={"min 8 characters"}
                type={"password"}
            />

            <button type={"submit"} className="btn-primary">
                Login
            </button>
        </form>
        <div className="">
            { errors && <p className="text-red-400 font-semibold text-xs pb-2.5"> {errors} </p>}
        </div>
        <div className="">
            <p className="text-[12px] text-slate-800 mt-3">Don't have an account? {" "}
            <button className="font-medium text-primary underline cursor-pointer" onClick={() => {
                setCurrentPage("signup")
            }}>SignUp</button>
            </p>
        </div>
    </div>
  )
}

export default Login
