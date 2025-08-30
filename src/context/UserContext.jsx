import React, {createContext, useEffect, useState} from 'react'
import axiosInstance from "../util/axiosInstance.js";
import {API_PATHS} from "../util/apiPath.js";
import toast from "react-hot-toast";

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
            if (user) return;

            const accessToken = sessionStorage.getItem('accessToken');
            if (!accessToken) {
                setLoading(false)
                return;
            }
            const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response?.data.user)
            }catch (err) {
                toast.error("user not authenticated" + err.message)
                clearUser()
            } finally {
                 setLoading(false)
            }
        }


            fetchUser()
        }, []);

    const updateUser =  userData => {
        setUser(userData)
        sessionStorage.setItem("accessToken", userData?.token)
        setLoading(false)
    }

    const clearUser =  () => {
        setLoading(false)
        setUser(null)
        sessionStorage.removeItem("accessToken");
    }

    return (
        <UserContext.Provider value={{ user, setUser, loading, updateUser, clearUser }}>
            { children }
        </UserContext.Provider>
    )
}

export  default  UserProvider