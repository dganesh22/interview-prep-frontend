import React, {useContext} from 'react';
import {UserContext} from "../../context/UserContext.jsx";
import Navbar from "./Navbar.jsx";
import { CARD_BG} from "../../util/data.js";

function DashboardLayout(props) {
    const { children } = props;
    const { user }= useContext(UserContext);

    return (
        <div>
            <Navbar/>
            { user && <div>{children}</div>}
        </div>
    );
}

export default DashboardLayout;