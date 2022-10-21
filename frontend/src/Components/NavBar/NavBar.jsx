import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userApi from "../../api/userApi";
import "./navbar.css";
const NavBar = () => {
  const user = useSelector((state) => state.auth.currentUser);
  console.log(user);
  const handleLogout = () => {
    userApi.logout(user);
  };
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home">
        Home
      </Link>
      {user ? (
        <>
          <p className="navbar-user">
            Hi, <span> {user.username || ""} </span>
          </p>
          <div className="navbar-logout" onClick={handleLogout}>
            Log out
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            Login
          </Link>
          <Link to="/register" className="navbar-register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
