import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Coffee from '../assets/images/Coffee 3.jpg';
import { uiSliceActions } from "../store/ui/uiSlice";

/**
 * DISPLAYS THE MODAL 
 */

const Modal = ({ children }) => {
    const { isLoginModalOpen, isSignupModalOpen } = useSelector((store) => store.ui);
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(uiSliceActions.closeModal());
    }
    return (
        <Wrapper>
            {(isLoginModalOpen || isSignupModalOpen) &&
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="img-container">
                            <img src={Coffee} alt="Coffee" />
                        </div>
                        <div className="form-container">
                            <h3>welcome</h3>
                            {children}
                        </div>
                        <button type="button" className="close-modal-btn" onClick={closeModal}><FaTimes /> </button>
                    </div>
                </div>
            }
        </Wrapper>
    );
}

const Wrapper = styled.section`
.modal-container{
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 1rem;
    text-align: center;
    width: 100vw;
    height: 100vh;
}
.img-container{
    height: 100%;
}
.img-container img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
}

/*============
FORM STYLES
=============*/
.btn{
    font-size: 0.7rem;
    padding: 0.5rem 0.75rem;
    margin-bottom: 1rem;
}
input{
    font-size: 1rem;
    border-radius: var(--radius);
    padding: 0.2rem 0.5rem;
}
.form-container{

}

@media screen and (min-width: 560px){
    .modal-container{
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        width: 80vw;
        height: 60vh;
    }
}
`;

export default Modal;