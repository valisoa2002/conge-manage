import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import Spinner from "../../partials/Spinner";
import { format } from "date-fns";

function History() {
  const [loading, setLoading] = useState(true);
  const { user, demandes, demandesPerUser, setDemandesPerUser, setDemandes } =
    useStateContext();

  useEffect(() => {
    // Pour les demandes à chaque utilisateur
    axiosClient
      .get(`/demandes/${user.id}`)
      .then(({ data }) => {
        setDemandesPerUser(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [1]);

  useEffect(() => {
    // Pour tous les demandes
    axiosClient
      .get(`/demandes`)
      .then(({ data }) => {
        setDemandes(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [1]);

  return (
    <div className="mt-5 mx-4 p-4 bg-slate-100 rounded-md">
      <h3 className="text-gray-900 text-3xl font-semibold my-4">
        Demandes effectués
      </h3>

      {user.is_admin == 0 && (
        <div className="text-[13px] overflow-auto">
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
                {demandesPerUser.map((d) => (
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
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      )}

      {user.is_admin == 1 && (
        <div className="overflow-auto text-[13px] ">
          <table className="table table-fixed ">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Poste</th>
                <th scope="col">Type</th>
                <th scope="col">Date début</th>
                <th scope="col">Date fin</th>
                <th scope="col" className="text-center">
                  Statut
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
                    <td>{d.type}</td>
                    <td>{format(new Date(d.date_debut), "dd-MM-yyyy")}</td>
                    <td>{format(new Date(d.date_fin), "dd-MM-yyyy")}</td>
                    <td className=" text-[12px] text-center font-semibold">
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

export default History;
