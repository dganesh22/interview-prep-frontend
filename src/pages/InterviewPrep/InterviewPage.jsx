import React, {useEffect, useState} from 'react'
import DashboardLayout from "../../components/Layouts/DashboardLayout.jsx";
import { useParams} from "react-router";
import moment from "moment";
import { AnimatePresence, motion } from 'framer-motion'
import { LuCircleAlert , LuListCollapse } from 'react-icons/lu'
import SpinnerLoader from "../../components/Loader/SpinnerLoader.jsx";
import toast from "react-hot-toast";
import RoleInfoHeader from "./components/RoleInfoHeader.jsx";
import axiosInstance from "../../util/axiosInstance.js";
import {API_PATHS} from "../../util/apiPath.js";
import * as questions from "framer-motion/m";
import QuestionCard from "../../components/Cards/QuestionCard.jsx";
import AiResponseView from "./components/AiResponseView.jsx";
import Drawer from "../../components/Drawer/Drawer.jsx";


function InterviewPage(props) {
    const { sessionId } = useParams()

    const [sessionData,setSessionData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
    const [explanation, setExplanation] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isUpdateLoader,setIsUpdateLoader] = useState(false);

    const [loadingStatus,setLoadingStatus] = useState("");

    // fetch session details by session id
    const fetchSessionData = async () => {
        try {
            setIsLoading(true)
            setLoadingStatus("Please wait... we are fetching session info..")
            let response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId))

            if(!response?.data?.session) {
                toast.error(response?.data?.errors)
            } else {
                toast.success("Successfully fetched the data")
                setSessionData(response?.data?.session)
                setLoadingStatus("")
                setIsLoading(false)
            }
        }catch(err) {
            console.error(err?.response.data.message)
        }
    }

    // generate concept explanation
    const generateConceptExplanation = async (question) => {}

    // pin question
    const toggleQuestionPinStatus = async (questionId) => {
        try {
            const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId))
            console.log("response", response)

            if(response && response?.data?.question) {
                toast.success(response?.data?.message)
                fetchSessionData()
            }
        }catch (err) {
            console.error(err?.message)
        }
    }

    // add more questions to session
    const uploadMoreQuestions = async () => {}

    useEffect(() => {
        if(sessionId) {
            fetchSessionData()
        }

        return () => {}
    }, []);

  return (
    <DashboardLayout>
        {
            isLoading ? (
                <>
                     <SpinnerLoader/>
                    <p className=""> { loadingStatus } </p>
                </>
            ) :  (
                <>
                     <RoleInfoHeader {...sessionData}/>
                     <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
                         <h2 className="text-xl font-semibold text-purple-600">Interview Question & Answers </h2>

                         <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
                             <div className={`col-span-12 ${
                                 openLeanMoreDrawer ? "md:col-span-7": "md:col-span-8"
                             }`}>
                                 <AnimatePresence>
                                     {
                                         sessionData?.questions?.map((item, index) => {
                                             return (
                                                 <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: -20}}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{
                                                        duration: 0.4,
                                                        type: "spring",
                                                        stiffness: 100,
                                                        delay: index * 0.1,
                                                        damping: 15
                                                    }}
                                                    layout // this is key props that animates position changes
                                                    layoutId={`question-${index}`} // helps frames track specific items
                                                 >
                                                     <>
                                                        <QuestionCard
                                                            indexNumber={index + 1}
                                                            question={item?.question}
                                                            answer={item?.answer}
                                                            onLearnMore={() => generateConceptExplanation(item?.question)}
                                                            isPinned={item?.isPinned}
                                                            onTogglePin={() => toggleQuestionPinStatus(item?._id)}
                                                        />
                                                     </>
                                                 </motion.div>
                                             )
                                         })
                                     }
                                 </AnimatePresence>
                             </div>
                         </div>

                         <Drawer
                            isOpen={openLeanMoreDrawer}
                            onClose={() => setOpenLeanMoreDrawer(false)}
                            title={!isLoading && explanation?.title }
                         >
                             {
                                 errorMsg && (
                                     <p className={"flex gap-2 text-amber-600 font-medium"}>
                                         <LuCircleAlert className={"mt-1"} /> { errorMsg }
                                     </p>
                                 )
                             }
                             {
                                 !isLoading  && explanation && (
                                 <AiResponseView content={explanation?.explanation}/>
                                 )
                             }
                         </Drawer>
                     </div>
                </>
            )
        }
    </DashboardLayout>
  )
}

export default InterviewPage
