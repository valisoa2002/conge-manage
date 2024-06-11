import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import Swal from "sweetalert2";
import Spinner from "../../partials/Spinner";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { differenceInDays, format } from "date-fns";

function Demandes() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demandes, setDemandes] = useState([]);
  const [data, setData] = useState({
    motif: "",
    date_debut: "",
    date_fin: "",
    type_id: 0,
    user_id: 0,
  });
  const { user, solde } = useStateContext();

  //=======================
  // Pour les champs types
  //=======================
  useEffect(() => {
    axiosClient
      .get("/types")
      .then(({ data }) => {
        setTypes(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //===============================
  // Pour les demandes ene attentes
  //===============================
  const fetchData = () => {
    axiosClient
      .get(`/demandes/status/attentes`)
      .then(({ data }) => {
        setDemandes(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [1]);

  //=======================
  // Pour onChange de value
  //=======================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
      user_id: user.id,
    });
  };

  //===========================
  // Pour soumettre les données
  //===========================
  const handleSubmit = (e) => {
    e.preventDefault();
    const DATE = differenceInDays(
      new Date(data.date_fin),
      new Date(data.date_debut)
    );
    console.log(DATE, solde);

    if (DATE > solde) {
      Swal.fire({
        title: "Solde insuffisant",
        text: "Vérifier votre solde!!",
        icon: "info",
        showConfirmButton: false,
        showCancelButton: false,
        iconColor: "#DC2626",
        timer: 2000,
      });
    } else {
      axiosClient
        .post("/conges/add", data)
        .then(() => {
          Swal.fire({
            text: "Mis à jour effectué!!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(data);
    }
  };

  //====================================
  // Pour valider les demandes de congés
  //====================================
  const handleValidConge = (id) => {
    Swal.fire({
      text: "Voulez-vous valider ce congé?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: "#DC2626",
      confirmButtonColor: "#111827",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .put(`/demandes/valid/${id}`)
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
  //====================================
  // Pour valider les demandes de congés
  //====================================
  const handleRefuseConge = (id) => {
    Swal.fire({
      text: "Voulez-vous réfuser ce congé?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: "#DC2626",
      confirmButtonColor: "#111827",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient
          .put(`/demandes/refus/${id}`)
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

  return (
    <div className="mt-5 mx-4 p-4 bg-slate-100 rounded-md">
      <h3 className="text-gray-900 text-3xl font-semibold my-4">
        Demande de congé
      </h3>
      {user.is_admin == 0 && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="motif" className="form-label">
              Motif:
            </label>
            <input
              type="text"
              className="form-control"
              name="motif"
              onChange={handleChange}
              id="motif"
              placeholder="Votre motif...."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="start" className="form-label">
              Date début:
            </label>
            <input
              type="date"
              className="form-control"
              name="date_debut"
              onChange={handleChange}
              id="start"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="end" className="form-label">
              Date fin:
            </label>
            <input
              type="date"
              className="form-control"
              name="date_fin"
              onChange={handleChange}
              id="end"
              aria-describedby="helpId"
              placeholder="Votre nom...."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nom" className="form-label">
              Types de congés:
            </label>

            <select
              className="form-control "
              name="type_id"
              id="type"
              onChange={handleChange}
            >
              {types.map((t) => (
                <option key={t.id} value={t.id} defaultValue="1">
                  {t.type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-slate-900 px-3 py-2 text-white rounded-md"
            >
              Valider
            </button>
          </div>
        </form>
      )}

      {user.is_admin == 1 && (
        <div className="overflow-auto text-[13px]">
          <table className="table table-auto">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Poste</th>
                <th scope="col">Motif</th>
                <th scope="col">Type</th>
                <th scope="col">Date début</th>
                <th scope="col">Date fin</th>
                <th scope="col" className="text-center">
                  Statut
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
                {demandes.map((d) => (
                  <tr key={d.date_debut}>
                    <td>{d.name}</td>
                    <td>{d.poste}</td>
                    <td>{d.motif}</td>
                    <td>{d.type}</td>
                    <td>{format(new Date(d.date_debut), "dd-MM-yyyy")}</td>
                    <td>{format(new Date(d.date_fin), "dd-MM-yyyy")}</td>
                    <td className="text-center text-[12px] font-semibold">
                      {d.status == 0 ? (
                        <span className="text-white bg-yellow-400  py-1 px-2 rounded-full">
                          En attente
                        </span>
                      ) : d.status == 1 ? (
                        <span className="text-white bg-green-500 py-1 px-2 rounded-full">
                          Valide
                        </span>
                      ) : (
                        <span className="text-white bg-red-600 py-1 px-2 rounded-full">
                          Refusé
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className="border  border-purple-500 p-2 rounded-full shadow-sm text-red-600"
                          title="Réfuser cette demande"
                          onClick={() => handleRefuseConge(d.id)}
                        >
                          <FaTrashAlt />
                        </button>
                        <button
                          type="button"
                          className="border border-purple-500 p-2 rounded-full shadow-sm text-green-600"
                          title="Accepter cette demande"
                          onClick={() => handleValidConge(d.id)}
                        >
                          <FaCheckCircle />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      )}
    </div>
  );
}

export default Demandes;
