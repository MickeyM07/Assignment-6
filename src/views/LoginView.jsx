import './LoginView.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../firebase/index.js";
import Footer from './components/Footer.jsx';
import NavBar from './components/NavBar.jsx';

function LoginView() {
    const { setEmail, email, setPassword, password, setUser } = useStoreContext();
    const [uemail, setUEmail] = useState('');
    const [upassword, setUPassword] = useState('');
    const navigate = useNavigate();

    console.log("AUTH OBJECT:", auth);

    async function loginByEmail(event) {
    event.preventDefault();

    try {
      const user = (await signInWithEmailAndPassword(auth, email.current.value, upassword)).user;
      navigate('/movies/genre');
      setUser(user);
    } catch (error) {
      console.log(error);
      alert("Error signing in!");
      console.log(upassword);
    }
  }

  async function loginByGoogle() {
    try {
      const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
      navigate('/movies/genre');
      setUser(user);
    } catch (error) {
      console.log(error);
      alert("Error signing in!");
      console.log(user);
    }
  }
    return (
        <form onSubmit={loginByEmail}>
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
                    <button onClick={() => loginByGoogle()} type="submit" className="login-button">Login by Google</button>
                </div>
            </div>
            <div className="login-footer">
                <Footer />
            </div>
        </form>
    )
}

export default LoginView;