import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import "./home.css";

const HomePage = () => {
  const [userList, setUserLists] = useState([]);

  const user = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  const handleDelete = () => {
    userApi.deleteUser(user);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      (async () => {
        try {
          const { data } = await userApi.getAllUsers(user);
          setUserLists(data);
        } catch (error) {
          console.log(error.message);
        }
      })();
    }
  }, []);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {userList?.map((user, idx) => (
          <div key={idx} className="user-container">
            <div className="home-user">{user.username}</div>
            <div className="delete-user" onClick={handleDelete}>
              Delete
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
