import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ token, setToken, darkMode, setDarkMode }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h2>Project Manager</h2>
            <div className="navbar-buttons">
                <button onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>
                <NavLink to="/" className="nav-link">
                    <button className="nav-btn">Home</button>
                </NavLink>
                {token ? (
                    <>
                        <NavLink to="/tasks" className="nav-link">
                            <button className="nav-btn">Tasks</button>
                        </NavLink>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <NavLink to="/login" className="nav-link">
                        <button className="nav-btn">Login</button>
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;