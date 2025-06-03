import './LoginView.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context';
import Footer from './components/Footer.jsx';
import NavBar from './components/NavBar.jsx';

function LoginView() {
    const { setEmail, email, setPassword, password } = useStoreContext();
    const [uemail, setUEmail] = useState('');
    const [upassword, setUPassword] = useState('');
    const navigate = useNavigate();

    function login(event) {
        event.preventDefault();
        if (email == uemail && password == upassword) {
            navigate('/movies/genre');
        } else {
            alert("Invalid email or password!");
            console.log(email, password, uemail, upassword);
        }
    }

    return (
        <form onSubmit={login}>
            <div className="login-header">
                <NavBar />
            </div>
            <div className="login-view">
                <div className="login-box">
                    <h4 className="input-text">Email:</h4>
                    <input className="email" type="email"
                        id="email"
                        name="email"
                        value={uemail}
                        onChange={(event) => setUEmail(event.target.value)}
                        required />
                    <h4 className="input-text">Password:</h4>
                    <input className="password" type="password"
                        id="password"
                        name="password"
                        value={upassword}
                        onChange={(event) => setUPassword(event.target.value)}
                        required />
                    <button type="submit" className="login-button">Login</button>
                </div>
            </div>
            <div className="login-footer">
                <Footer />
            </div>
        </form>
    )
}

export default LoginView;