import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Modal } from "../components";
import { uiSliceActions } from "../store/ui/uiSlice";

/**
 * DISPLAYS THE LOGIN UI
 */

const Login = () => {
    const [user, setUser] = useState({ userName: '', password: '' });
    const [error, setError] = useState('');
    const { userInfo } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setError('');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!user.userName.length || !user.password.length){
            return;
        }
        if (userInfo.userName === "" || userInfo.userName !== user.userName) {
            setError('user does not exist');
            return;
        }
        if (userInfo.password !== user.password) {
            setError('incorrect username or password')
            return;
        }
        localStorage.setItem('logout', JSON.stringify(false));
        dispatch(uiSliceActions.closeModal());
        dispatch(uiSliceActions.closeSidebar());
        setUser({ userName: '', password: '' });
        navigate('/products');
    }
    return (
        <>
            <Modal>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label htmlFor="user-name" className="form-label">Username </label>
                        <input type="text" name="userName" id="user-name" value={user.userName} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="user-password" className="form-label">password </label>
                        <input type="password" name="password" id="user-password" value={user.password} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn">Sign in</button>
                </form>
                {error.length > 0 && <p className="error-msg">{error}</p>}
            </Modal>
        </>
    );
}

export default Login;