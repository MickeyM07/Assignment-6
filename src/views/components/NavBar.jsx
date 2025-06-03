import './NavBar.css'
import { Link } from "react-router-dom";

function NavBar() {

    return (
        <div className="navBar">
            <div className="logo">
                <Link to={`/`} className="logo">DebtFlix</Link>
            </div>
            <div className="subheaders">
                <div className="subheader-items">
                    <h1>Movies</h1>
                </div>
                <div className="subheader-items">
                    <h1>TV shows</h1>
                </div>
                <div className="subheader-items">
                    <h1>Popular</h1>
                </div>
                <div className="subheader-items">
                    <h1>Recent</h1>
                </div>
                <Link to={`/login`} className="login">Login</Link>
                <Link to={`/register`} className="register">Register</Link>
            </div>
        </div>
    )
}

export default NavBar;