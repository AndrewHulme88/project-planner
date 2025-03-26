import { Link } from "react-router-dom";

const LandingPage = () => {
    const token = localStorage.getItem("token");

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Welcome to Project Manager</h2>
            <p>Track your tasks. Stay productive.</p>

            {!token ? (
                <Link to="/login">
                    <button style={{ marginRight: "10px" }}>Login / Sign Up</button>
                </Link>
            ) : (
                <Link to="/tasks">
                    <button>Go to Tasks</button>
                </Link>
            )}
        </div>
    );
};
    

export default LandingPage;