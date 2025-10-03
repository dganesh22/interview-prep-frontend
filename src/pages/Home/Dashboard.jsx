import React, {useEffect, useState} from 'react'
import DashboardLayout from "../../components/Layouts/DashboardLayout.jsx";
import {useNavigate} from "react-router";
import { LuPlus } from 'react-icons/lu'
import { toast } from 'react-hot-toast'
import { CARD_BG } from "../../util/data.js";
import axiosInstance from "../../util/axiosInstance.js";
import {API_PATHS} from "../../util/apiPath.js";
import SummaryCard from "../../components/Cards/SummaryCard.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import CreateSessionForm from "../../components/Forms/CreateSessionForm.jsx";
import DeleteAlertContent from "../../components/Modal/DeleteAlertContent.jsx";

function Dashboard() {
    const navigate = useNavigate()
    const [openCreateModal,setOpenCreateModal] = useState(false);
    const [sessions,setSessions] = useState([]);

    const [openDeleteAlert,setOpenDeleteAlert] = useState({
        open: false,
        data: null
    });

    // fetch all sessions
    const fetchAllSessions = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
            setSessions(response?.data.sessions)
        }catch (e) {
            console.error(e.message)
        }
    }

    // delete session
    const deleteSession = async (sessionData) => {
        // console.log(`session data =`, sessionData)
        try {
          let resp =  await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id))
            toast.success(resp?.data?.message)
            setOpenDeleteAlert({
                open: false,
                data: null
            });

            fetchAllSessions()
        }catch (e) {
            console.error(e?.message)
        }
    }

    useEffect(() => {
        fetchAllSessions()
    }, []);
  return (
    <DashboardLayout>
            <div className="container mx-auto pt-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
                    {
                        sessions?.map((item,index) => {
                            return <SummaryCard key={index} {...item}
                                colors={CARD_BG[index % CARD_BG.length]}
                                onSelect={() => navigate(`/interview-prep/${item?._id}`)}
                                onDelete={() => setOpenDeleteAlert({ open: true, data:item })}
                            />
                        })
                    }
                </div>
                <button className="h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20" onClick={() => setOpenCreateModal(true)}>
                    <LuPlus className={'text-2xl text-white'}/>
                    Add New
                </button>
            </div>

    {/*  modal */}
        <Modal
            isOpen={ openCreateModal}
            onClose={() => {
                setOpenCreateModal(false)
            }}
            hideHeader
        >
            <div className="">
                <CreateSessionForm/>
            </div>
        </Modal>

    {/*  delete confirm modal */}
        <Modal
            isOpen={openDeleteAlert?.open}
            onClose={() => {
                setOpenDeleteAlert(!openDeleteAlert?.open)
            }}
            title={"Delete Confirmation"}
        >
            <div className="w-[30vw]">
                <DeleteAlertContent
                    content={"Are you sure you want to delete this session?"}
                    onDelete={() => deleteSession(openDeleteAlert?.data)}
                    onClose={() => {
                setOpenDeleteAlert(!openDeleteAlert?.open)
            }}
                />
            </div>
        </Modal>
    </DashboardLayout>
  )
}

export default Dashboard
