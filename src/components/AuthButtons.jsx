import { useDispatch, useSelector } from "react-redux";
import { uiSliceActions } from "../store/ui/uiSlice";
import { userSliceActions } from "../store/user/userSlice";
import { FaUserPlus } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router";
import styled from "styled-components";

/**
 * @returns REACT ELEMENT WHICH DISPLAYS AUTHENTICATION BUTTONS
 */

const AuthButtons = () => {
    const { userInfo } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogout = JSON.parse(localStorage.getItem('logout'));

    const handleLogin = () => {
        dispatch(uiSliceActions.openLoginModal());
    }
    const handleSignup = () => {
        dispatch(uiSliceActions.openSignupModal());
    }

    const handleLogout = ()=>{
        dispatch(userSliceActions.removeUser());
        dispatch(uiSliceActions.closeSidebar());
        navigate('/');
    }

    return (
        <Wrapper className="auth-btn-container">
            {
                (!userInfo.userName || isLogout) ? (
                    <>
                        <button type="button" className="auth-btn" onClick={handleLogin}>Login <SiGnuprivacyguard /></button>
                        <button type="button" className="auth-btn" onClick={handleSignup}>Signup <FaUserPlus /></button>
                    </>
                ) : (
                    <>
                        <h4 className="user-name">Welcome, {userInfo.userName}</h4>
                        <button type="button" className="auth-btn" onClick={handleLogout}>Logout <CiLogout /></button>
                    </>
                )
            }
        </Wrapper>
    );
}

const Wrapper = styled.div`
display: none;
.auth-btn{
    background-color: transparent;
    border-color: transparent;
    font-size: 1rem;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: var(--transition);
    svg{
        margin-left: 8px;
        color: var(--clr-primary-5);
    }
}
.auth-btn:hover{
    opacity: 0.7;
}
@media screen and (min-width: 576px){
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
}
`;

export default AuthButtons;