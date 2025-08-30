import React, {useState} from 'react';
import {useNavigate} from "react-router";
import { toast } from 'react-hot-toast'
import Input from '../Inputs/Input.jsx'
import {LuPlus, LuSave} from "react-icons/lu";
import SpinnerLoader from "../Loader/SpinnerLoader.jsx";
import axiosInstance from "../../util/axiosInstance.js";
import {API_PATHS} from "../../util/apiPath.js";

function CreateSessionForm(props) {
    const [formData,setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        numberOfQuestions: 0,
        description: "",
    });
    const [errors,setErrors] = useState(null)
    const [isLoading,setIsLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState("")

    const navigate = useNavigate()

    const handleInput = async (key,value) => {
        setFormData({...formData, [key]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { role, experience, topicsToFocus, numberOfQuestions, description } = formData

            if(!role || !experience || !topicsToFocus || !numberOfQuestions) {
                setErrors("All fields are required..")
                return;
            }

            setErrors("")
            setIsLoading(true)
            setLoadingStatus("AI is generating questions and answers.. please wait..")

            // AI API Call to generate questions
            const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
                role,
                experience,
                topicsToFocus,
                numberOfQuestions,
                description
            })

            if(aiResponse.data.errors) {
                toast.error(aiResponse?.data.errors)
            } else {
                // ai generated questions and answers array
            let generatedQuestions = aiResponse?.data.output;

            setLoadingStatus("Creating new session with ai generated content..")
            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE,{
                ...formData,
                questions: generatedQuestions,
            })

            if(response?.data.session?._id) {
                toast.success(response?.data.message)
                navigate(`/interview-prep/${response?.data?.session?._id}`)
            }
            }

        }catch (err) {
            if(err.response && err.response.data.message) {
                toast.error(err?.response.data.message)
                setIsLoading(false)
            } else {
                toast.error("something wrong")
                setIsLoading(false)
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center overflow-y-auto">
            <h3 className="text-lg font-semibold text-green-700">
                Start a New Interview Journey
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-[5px] mb-6">
                Fill out a few quick details and unlock your personalized set of interview questions
            </p>

            <form method="post" autoComplete={"off"} className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <Input
                    value={formData.role}
                    label={"Job Role"}
                    onChange={({target}) => handleInput("role", target.value)}
                    placeholder={"(e.g: Frontend Developer, Java Developer)"}
                    type={"text"}
                />
                <Input
                    value={formData.experience}
                    label={"Experience in Years"}
                    onChange={({target}) => handleInput("experience", target.value)}
                    placeholder={"(e.g: 1)"}
                    type={"number"}
                />
                <span className="text-xs text-amber-500">For best results maximum limit of experience 10 years</span>
                <Input
                    value={formData.topicsToFocus}
                    label={"Topics Name to Focus on"}
                    onChange={({target}) => handleInput("topicsToFocus", target.value)}
                    placeholder={"(Enter Comma-seperated.) eg: React,Java,HTML,CSS"}
                    type={"text"}
                />

                <Input
                    value={formData.numberOfQuestions}
                    label={"Number Of Questions"}
                    onChange={({target}) => handleInput("numberOfQuestions", target.value)}
                    placeholder={"10"}
                    type={"number"}
                />
                <span className="text-xs text-amber-500">For best results maximum limit of number of questions Up to 50 questions</span>
                <Input
                    value={formData.description}
                    label={"Description"}
                    onChange={({target}) => handleInput("description", target.value)}
                    placeholder={"Any Specific note for this session"}
                    type={"text"}
                />

                <button className="flex items-center justify-center btn-success" type={"submit"} disabled={isLoading}>
                    {
                        isLoading && <SpinnerLoader/>
                    }

                    {
                        isLoading ? <span> { loadingStatus } </span>: (
                             <>
                                <LuSave className="text-md"/> Create Session
                             </>
                        )
                    }
                </button>
            </form>

            <div className="flex items-center justify-center">
                {
                errors && <p className="text-red-500 text-sm pt-2.5 pb-2"> { errors } </p>
                }
            </div>
        </div>
    );
}

export default CreateSessionForm;