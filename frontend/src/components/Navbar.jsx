import { Link, useNavigate } from "react-router-dom";
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
                {token ? (
                    <>
                        <Link to="/tasks"><button>Tasks</button></Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login"><button>Login</button></Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;