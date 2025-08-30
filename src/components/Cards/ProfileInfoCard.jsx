import React, {useContext} from 'react';
import {UserContext} from "../../context/UserContext.jsx";
import {useNavigate} from "react-router";
import toast from "react-hot-toast";

function ProfileInfoCard(props) {
    const { user,clearUser } = useContext(UserContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        if(window.confirm(`Are you sure to logout?`)) {
            sessionStorage.clear()
            clearUser()
        toast.success("Logout successfully.")
        navigate(`/`)
        } else {
            toast.custom("logout terminated")
        }
    }
    return (
        user && (
        <div className={"flex items-center flex-row mx-5"}>
            <img
                src={user?.profileImageUrl}
                alt={"no user image found"}
                className={"h-10 w-10 bg-gray-300 rounded-full mr-3"}
            />
            <div className="">
                <div className="text-[15px] text-black font-bold leading-3 text-gray-700 capitalize">
                    { user?.name }
                </div>
                <button className="text-amber-600 font-semibold cursor-pointer hover:underline" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
    )
}

export default ProfileInfoCard;