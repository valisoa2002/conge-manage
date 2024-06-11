import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import ADMIN_LINKS from "../../partials/adminLinks";
import USER_LINKS from "../../partials/userLinks";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";

function Sidebar() {
  const { user, activeMenu, activeItem, setToken, setUser, setActiveSection } =
    useStateContext();

  const handleLogout = () => {
    axiosClient.post("/logout").then(() => {
      setToken(null);
      setActiveSection("profil");
      setUser({});
    });
  };

  useEffect(() => {
    axiosClient
      .get("/user")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [1]);

  return (
    <div className="h-screen md:overflow-hidden overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="text-center my-4">
            <Link to="/dashboard" className="text-2xl  text-white">
              Congé
            </Link>

            <span className="text-slate-100 block mt-3">{user.email}</span>
          </div>
          <div className="mt-20">
            <ul className="text-white text-[19 px] font-medium">
              {user.is_admin == 0 &&
                USER_LINKS.map((item) => (
                  <li
                    key={item.name}
                    className={`pl-4 pt-3 pb-2.5 hover:bg-gray-800 hover:text-white mx-2 rounded ${
                      activeItem == item.section ? "bg-slate-600" : ""
                    }`}
                    onClick={() => setActiveSection(item.section)}
                  >
                    <Link
                      to={item.link}
                      className="flex items-center gap-3 text-white"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}

              {user.is_admin != 0 &&
                ADMIN_LINKS.map((item) => (
                  <li
                    key={item.name}
                    className={`pl-4 pt-3 pb-2.5 hover:bg-gray-800 hover:text-white mx-2 rounded ${
                      activeItem == item.section ? "bg-slate-600" : ""
                    }`}
                    onClick={() => setActiveSection(item.section)}
                  >
                    <a href="#" className="flex items-center gap-3 text-white">
                      {item.icon}
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}

              <li className="fixed bottom-10 left-6">
                <a
                  href="#"
                  className="flex gap-3 items-center text-red-500"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  Se déconnecter
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
