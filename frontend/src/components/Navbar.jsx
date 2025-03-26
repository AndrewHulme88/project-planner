import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ token, setToken, darkMode, setDarkMode }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: darkMode ? "#333" : "#eee",
            color: darkMode ? "#fff" : "#000",
            borderBottom: "1px solid #ccc"
        }}>
            <h2 style={{ margin: 0 }}>Project Manager</h2>
            <div>
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