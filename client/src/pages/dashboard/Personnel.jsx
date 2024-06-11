import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Spinner from "../../partials/Spinner";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

function Personnel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =============================
  // Récuperer tous les personnels
  // =============================
  const fetchData = () => {
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setUsers(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ============================
  // Set personnel to Responsable
  // ============================
  const handleSetAdmin = (id) => {
    Swal.fire({
      text: "Voulez-vous ajouter cet utilisateur comme responsable?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: "#DC2626",
      confirmButtonColor: "#111827",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .put(`users/to/admin/${id}`)
          .then(() => {
            Swal.fire({
              text: "Mis à jour effectué!!!",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // ============================
  // Suppression d'un personnel
  // ============================
  const handleDeleteUser = (id) => {
    Swal.fire({
      text: "Voulez-vous supprimer ce personnel?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: "#DC2626",
      confirmButtonColor: "#111827",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .delete(`users/${id}`)
          .then(() => {
            Swal.fire({
              text: "Personnel supprimé!!!",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="mt-5 mx-4 p-4 bg-slate-100 rounded-md">
      <h3 className="text-gray-900 text-4xl font-semibold my-4">Personnels</h3>

      <div className="overflow-auto h-72">
        <table className="table table-auto text-[13px]">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Poste</th>
              <th scope="col">Statut</th>
              <th scope="col" className="text-center">
                Solde
              </th>
              <th scope="col" className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={6}>
                  <Spinner height={80} width={80} color="#111827" />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.contact}</td>
                  <td>{u.poste}</td>
                  <td className="text-center">
                    <span
                      className={`text-white text-[12px] font-medium py-1 px-2 rounded-full ${
                        u.is_admin == 1 ? "bg-yellow-400" : "bg-red-600"
                      }`}
                    >
                      {u.is_admin == 1 ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="text-center">{u.solde ? u.solde : 0}</td>
                  <td>
                    <div className="flex">
                      <button
                        type="button"
                        className="mr-2 border border-purple-500 p-2 rounded-full shadow-sm text-red-600"
                        title="Supprimer ce personnel"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        <FaTrash />
                      </button>

                      {u.is_admin == 0 && (
                        <button
                          type="button"
                          className="mr-2 border border-purple-500 p-2 rounded-full shadow-sm text-gray-600"
                          title="Ajouter comme responsable"
                          onClick={() => handleSetAdmin(u.id)}
                        >
                          <FaCheckCircle />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default Personnel;
