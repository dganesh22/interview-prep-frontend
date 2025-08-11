import React, {useState} from 'react'
import {useNavigate} from "react-router";
import Input from "../../components/Inputs/Input.jsx";
import ProfileImageSelector from "../../components/Inputs/ProfileImageSelector.jsx";
import {validateEmail} from "../../util/helper.js";

function Signup(props) {
    const { setCurrentPage } = props

    const [profilePic,setProfilePic] = useState(null)
    const [fullName,setFullname] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [errors,setErrors] = useState(null)

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()

        let profileImageUrl= ""
        if(!fullName) {
            setErrors("Please enter fullname")
            return
        }

        if(!validateEmail(email)) {
            setErrors("Please enter a valid email address")
            return
        }

        if(!password) {
            setErrors("Please enter the password")
            return
        }

        if(password.length < 8) {
            setErrors("Min password length 8 characters long")
            return
        }

        setErrors("")

        // Signup api call
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
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Join us today by entering your details below
        </p>

        <form autoComplete="off" method={"post"} onSubmit={handleSignup}>
            <ProfileImageSelector
                    image={profilePic}
                    setImage={setProfilePic}
                />
            <div className="">
                <Input
                    value={fullName}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder={"Enter your fullname"}
                    label={"Your Fullname"}
                    type={"text"}
                />
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={"james@gmail.com"}
                    label={"Your Email Address"}
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
                    SignUp
                </button>
            </div>
        </form>
         <div className="">
            { errors && <p className="text-red-400 text-xs pb-2.5"> {errors} </p>}
        </div>
        <div className="">
            <p className="text-[12px] text-slate-800 mt-3">Already registered user ? {" "}
            <button className="font-medium text-primary underline cursor-pointer" onClick={() => {
                setCurrentPage("login")
            }}>Login</button>
            </p>
        </div>
    </div>
  )
}

export default Signup
