import { Navigate } from "react-router";
import Sidebar from "../components/dashboard/Sidebar";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "../components/dashboard/Navbar";

import {
  History,
  Personnel,
  Calendrier,
  Demandes,
  AddResponsable,
  Profile,
  EditUser,
} from "./dashboard";

function Dashboard() {
  const { activeMenu, activeItem, token } = useStateContext();

  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <div className={`fixed ${activeMenu ? "w-72  bg-gray-900" : "w-0"}`}>
        <Sidebar />
      </div>
      <div className={`min-h-screen ${activeMenu ? "md:ml-72" : "flex-2 "}`}>
        <Navbar />
        <div>
          {activeItem === "profil" && <Profile />}
          {activeItem === "personnel" && <Personnel />}
          {activeItem === "calendrier" && <Calendrier />}
          {activeItem === "demandes_attentes" && <Demandes />}
          {activeItem === "demande" && <Demandes />}
          {activeItem === "historique" && <History />}
          {activeItem === "edit" && <EditUser />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
