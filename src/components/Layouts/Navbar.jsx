import React from 'react';
import {NavLink} from "react-router";
import ProfileInfoCard from "../Cards/ProfileInfoCard.jsx";

function Navbar(props) {
    return (
        <div className={'h-16 bg-white border border-b border-gray-400/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-100'}>
            <div className="container mx-auto flex items-center justify-between gap-5">
                <NavLink className="text-lg md:text-xl font-medium  text-black leading-5" to={`/dashboard`}>
                    <h2 className="text-blue-700">
                        WebGurukula
                    </h2>
                </NavLink>
                <ProfileInfoCard/>
            </div>
        </div>
    );
}

export default Navbar;