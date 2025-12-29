import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
  <div>
    <h2>Dashboard</h2>

    <p>
      Logged in as: <b>{user?.email}</b>
    </p>

    <button onClick={() => navigate("/create")}>
  Create Issue
</button>

<br /><br />

<button onClick={() => navigate("/issues")}>
  View Issues
</button>

<br /><br />



    <button onClick={handleLogout}>Logout</button>
  </div>
);

}

export default Dashboard;
