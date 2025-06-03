import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback, useRef, useEffect } from "react";

function Header() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const debounceTimeout = useRef(null);

    const handleSearch = useCallback((query) => {
        if (query.trim()) {
            navigate(`/movies/search?query=${encodeURIComponent(query)}&page=1`);
        }
    }, [navigate]);

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            handleSearch(message);
        }, 500);

        return () => clearTimeout(debounceTimeout.current);
    }, [message, handleSearch]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch(message);
        }
    };

    return (
        <div className="header">
            <div className="header-logo">
                <Link to={`/`} className="header-logo">DebtFlix</Link>
            </div>
            <div className="subheaders2">
                <div className="subheader-items2">
                    <h1>Recent</h1>
                </div>
                <div className="subheader-items2">
                    <h1>Popular</h1>
                </div>
                <div className="search">
                    <div className="searchbox">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <Link to={`/settings`} className="login">Settings</Link>
                <Link to={`/cart`} className="register">Cart</Link>
                <Link to={`/`} className="register">Logout</Link>
            </div>
        </div>
    );
}

export default Header;