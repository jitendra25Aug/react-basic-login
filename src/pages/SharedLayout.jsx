import { Outlet } from "react-router";
import { Navbar, Sidebar } from "../components";

/**
 * CONTAINS THE WHOLE UI OF THE APPLICATION
 */

const SharedLayout = ()=>{
    return (
        <>
            <Navbar />
            <Sidebar />
            <Outlet />
        </>
    );
}

export default SharedLayout;