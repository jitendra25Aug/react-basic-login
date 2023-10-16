import { useSelector } from "react-redux";
import { Navigate } from "react-router";

/**
 * DOESN"T ALLOW USER TO NAVIGATE TO '/PRODUCTS' UNTIL LOGIN
 */

const ProtectedRoute = ({ children }) => {
    const { userInfo } = useSelector((store) => store.user);
    const isLogout = JSON.parse(localStorage.getItem('logout'));

    if(!userInfo.userName || isLogout){
        return <Navigate to="/" />
    }
    return children;
}

export default ProtectedRoute;