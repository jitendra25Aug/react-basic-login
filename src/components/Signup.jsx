import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Modal } from "../components";
import { uiSliceActions } from "../store/ui/uiSlice";
import { userSliceActions } from "../store/user/userSlice";

/**
 * DISPLAYS THE SIGNUP UI
 */

const Signup = () => {
    const [userInfo, setUserInfo] = useState({ userName: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
        setError('');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!userInfo.userName.length || !userInfo.email.length || !userInfo.password.length){
            return;
        }
        if (!userInfo.email.includes('@')) {
            setError('incorrect email')
            return;
        }
        if (userInfo.password.length < 2) {
            setError('password should be of more than 2 characters');
            return;
        }
        if (userInfo.password.trim() !== userInfo.confirmPassword.trim()) {
            setError('password does not match')
            return;
        }

        let userInfoPayload = { userName: userInfo.userName, email: userInfo.email, password: userInfo.password }
        dispatch(userSliceActions.setLocalStorage({ ...userInfoPayload }));
        dispatch(uiSliceActions.closeModal());
        dispatch(uiSliceActions.closeSidebar());
        setUserInfo({ userName: '', email: '', password: '', confirmPassword: '' });
        localStorage.setItem('logout', JSON.stringify(false));
        navigate('/products');
    }
    return (
        <>
            <Modal>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label htmlFor="user-name" className="form-label">Username </label>
                        <input type="text" name="userName" id="user-name" value={userInfo.userName} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="email" className="form-label">Email </label>
                        <input type="email" name="email" id="email" value={userInfo.email} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="user-password" className="form-label">password </label>
                        <input type="password" name="password" id="user-password" value={userInfo.password} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="confirm-password" className="form-label">confirm password </label>
                        <input type="password" name="confirmPassword" id="confirm-password" value={userInfo.confirmPassword} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn">Sign up</button>
                </form>
                {error.length > 0 && <p className="error-msg">{error}</p>}
            </Modal>
        </>
    );
}

export default Signup;