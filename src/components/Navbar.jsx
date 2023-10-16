import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import Logo from '../assets/images/Logo.png';
import { useDispatch } from "react-redux";
import { uiSliceActions } from "../store/ui/uiSlice";
import { AuthButtons } from ".";

/**
 * DISPLAYS THE NAVIGATION MENU
 */

const Navbar = () => {
    const dispatch = useDispatch();
    const isLogout = JSON.parse(localStorage.getItem('logout'));

    const openSidebar = () => {
        dispatch(uiSliceActions.openSidebar());
    }

    return (
        <NavContainer>
            <div className="nav-center">
                <div className="nav-header">
                    <Link to="/"><img src={Logo} alt="Apple Rocket" /> </Link>
                    <button type="button" className="nav-toggle" onClick={openSidebar}><FaBars /> </button>
                </div>
                <AuthButtons />
            </div>
        </NavContainer>
    );
}

const NavContainer = styled.nav`
display: flex;
align-items: center;
justify-content: center;
height: 5rem;
position: sticky;
top: 0;
left: 0;
right: 0;
z-index: 5;
background-color: var(--clr-grey-10);
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

.nav-center{
    width : 90vw;
    max-width: var(--max-width);
    margin: 0 auto;
}
.nav-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.nav-toggle{
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
    svg{
        font-size: 2rem;
        color: var(--clr-primary-5);
    }
}

.user-name{
    color: var(--clr-primary-5);
    margin-bottom: 0;
}

@media screen and (min-width: 576px){
    .nav-toggle{
        display: none;
    }
    .nav-center{
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        justify-items: end;
    }
}
`;

export default Navbar;