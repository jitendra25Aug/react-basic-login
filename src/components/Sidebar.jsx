import styled from "styled-components";
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { uiSliceActions } from "../store/ui/uiSlice";
import { AuthButtons } from ".";

/**
 * DISPLAYS THE SIDEBAR MENU
 */

const Sidebar = () => {
    const { isSidebarOpen } = useSelector((store) => store.ui);
    const dispatch = useDispatch();

    const closeSidebar = ()=>{
        dispatch(uiSliceActions.closeSidebar());
    }
    return (
        <SidebarContainer>
            <aside className={`${isSidebarOpen ? "sidebar show-sidebar" : 'sidebar'}`}>
                <div className="sidebar-header">
                    <button type="button" className="close-btn" onClick={closeSidebar} ><MdClose /> </button>
                </div>
                <AuthButtons />
            </aside>
        </SidebarContainer>
    );
}

const SidebarContainer = styled.div`
text-align: center;
font-size: clamp(1rem, 4vw, 1.25rem);
.sidebar-header{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 1.5rem;
}

.close-btn{
    background-color: transparent;
    border-color: transparent;
    color: var(--clr-red-dark);
    cursor: pointer;
    transition: var(--transition);
    margin-top: 0.2rem;
}
.close-btn:hover{
    color: var(--clr-red-light);
}
svg{
    font-size: 2rem;
}

.sidebar{
    position: fixed;
    top: 0px;
    bottom: 0px;
    right: 0px;
    width: min(75vw, 400px);
    height: 100vh;
    outline: 0px;
    background-color: var(--clr-white);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 9;
    transform: translateX(100vw);
    visibility: hidden;
    transition: var(--transition);
}
.show-sidebar{
    transform: translateX(0vw);
    visibility: visible;
}

.auth-btn-container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
}
.auth-btn{
    padding: 0.25rem 0.6rem;
    border-radius: var(--radius);
}
.auth-btn:hover{
    border: 1px solid var(--clr-primary-5);
    opacity: 1;
}
.user-name{
    font-size: 1.2rem;
}
@media screen and (min-width: 576px){
    .sidebar{
        display: none;
    }
}

`;

export default Sidebar;