import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router'
import {APP_FEATURES} from '../util/data.js'
import { LuSparkles } from 'react-icons/lu'
import heroImage from '../assets/hero.svg'
import Login from "./Auth/Login.jsx";
import Signup from "./Auth/Signup.jsx";
import Modal from "../components/Modal/Modal.jsx";
import {UserContext} from "../context/UserContext.jsx";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard.jsx";

function LandingPage() {
    const navigate = useNavigate()
    const [openAuthModal, setOpenAuthModal] = useState(false)
    const [currentPage, setCurrentPage] = useState('login')
    const [yr, setYr] = useState(new Date().getFullYear())
    const { user } = useContext(UserContext)
    const handleCTA = () => {
        if(!user) {
            setOpenAuthModal(true)
        } else {
            navigate(`/dashboard`)
        }
    }
    return (
        <section>
            <div className={"w-[90%] mx-auto min-h-full  bg-[#fff]"}>
            <div className="w-[500px] h-[500px] bg-[#fff] blur-[65px] absolute top-0 left-0 "></div>

            <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
                {/*  header */}
                <header className="flex justify-between items-center mb-16">
                    <div className="text-xl text-black font-bold">
                        Interview Prep AI
                    </div>
                    {
                        user ? <ProfileInfoCard/> : (
                            <button
                                className="bg-linear-to-r from-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
                                onClick={() => setOpenAuthModal(true)}>
                                Login/ Signup
                            </button>
                        )
                    }
                </header>

                {/* Hero Content */}
                <div className="flex flex-col md:flex-row  items-center ">
                    <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0 px-6">
                        <div className="flex items-center justify-left mb-2">
                            <div
                                className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                                <LuSparkles/> AI powered
                            </div>
                        </div>

                        <h1 className="text-4xl text-black font-medium mb-6 leading-tight">
                            Ace Interviews with <br/>
                            <span
                                className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#ff9324_0%,_#fcd760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                            AI-Powered
                        </span>{" "}
                            Learning
                        </h1>
                    </div>

                    <div className="w-full md:w-1/2">
                        <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                            Get role-specific questions, expand answers when you need them, dive deeper into the
                            concepts, and organize everything your way, From preparation to mastery - your ultimate
                            interview is here.
                        </p>

                        <button className="bg-black text-white font-semibold text-sm px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer" onClick={handleCTA}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            </div> {/*end*/}
            <div className="w-full min-h-full relative z-10">
                <div>
                    <section className="flex items-center justify-center -mt-36">
                        <img src={heroImage} alt="no image found" className={'w-[80vw] rounded-lg'}/>
                    </section>
                </div>
                    {/* cards */}
                <div className="w-full min-h-full bg-[#fff] mt-10">
                    <div className="container mx-auto px-4 pt-10 pb-20">
                        <section className="mt-5">
                            <h2 className="text-2xl font-medium text-center mb-12">
                                Features that make you shine
                            </h2>

                            <div className="flex flex-col items-center gap-8">
                            {/*  first 3 cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                                    {
                                        APP_FEATURES?.slice(0,3).map((item) => {
                                            return (
                                                <div key={item.id} className={'bg-[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg cursor-pointer shadow-amber-100 transition border border-amber-100'}>
                                                    <h3 className="text-base font-semibold mb-3">
                                                        { item?.title }
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        { item?.description }
                                                    </p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            {/*    remaining 2 cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {
                                        APP_FEATURES?.slice(3).map((item) => {
                                            return (
                                                <div key={item?.id} className={'bg-[#fffef8] p-6 rounded-xl hover:shadow-lg shadow-amber-100 transition border border-amber-100 cursor-pointer'}>
                                                    <h3 className="text-base font-semibold mb-3">
                                                        { item?.title }
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        { item?.description }
                                                    </p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="text-sm bg-gray-600 text-white font-semibold text-md text-center p-5 mt-5">
                    All Rights Reserved &copy; <span> { yr } </span>
                </div>
            </div>

            {/* modal */}
            <Modal
                isOpen={openAuthModal}
                onClose={() => {
                    setOpenAuthModal(false)
                    setCurrentPage("login")
                }}
                hideHeader
            >
                <div className="">
                    {
                        currentPage === "login"  && (
                            <Login setCurrentPage={setCurrentPage} />
                        )
                    }
                     {
                        currentPage === "signup"  && (
                            <Signup setCurrentPage={setCurrentPage} />
                        )
                    }
                </div>
            </Modal>
        </section>
    )
}

export default LandingPage
