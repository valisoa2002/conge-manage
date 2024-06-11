import { FaUserEdit } from "react-icons/fa";
import { useStateContext } from "../../contexts/ContextProvider";
import Chartify from "../../partials/Chartify";
import { useEffect } from "react";
import axiosClient from "../../axios-client";

function Profile() {
  const {
    user,
    demandesEffectues,
    solde,
    refus,
    valid,
    attentes,
    setDemandesEffectues,
    setSolde,
    setValid,
    setAttentes,
    setRefus,
    setActiveSection,
  } = useStateContext();

  const id = user.id ?? 1;

  // ======================================
  // Recuperer les stats pour l'utilisateur
  // ======================================
  useEffect(() => {
    axiosClient
      .get(`/users/infos/soldes_and_count/${id}`)
      .then(({ data }) => {
        setDemandesEffectues(data.demandes.demandes_effectues);
        setSolde(data.solde.nombre_jour);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // =========================================
  // Recuperer les stats demandes pour l'admin
  // =========================================
  useEffect(() => {
    axiosClient
      .get("/users/stats/admin")
      .then(({ data }) => {
        setValid(data.valid.nbre_valid);
        setRefus(data.refus.nbre_refus);
        setAttentes(data.attentes.nbre_attentes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mt-5 mx-4 p-4">
      <div className="  grid grid-cols-3 gap-3">
        <div className="bg-purple-500 rounded-md text-white w-full mx-auto p-6">
          <p className=" text-[1.1rem] ">
            {user.is_admin == 1
              ? "Demande(s) en attente(s)"
              : "Demandes Effectués"}
          </p>
          <p className=" text-[2rem] ">
            {user.is_admin == 1 ? attentes : demandesEffectues}
          </p>
        </div>

        <div className="bg-red-500 rounded text-white w-full mx-auto p-6">
          <p className=" text-[1.1rem] ">
            {user.is_admin == 1
              ? "Demande(s) réfusé(s)"
              : "Solde(s) restant(s)"}
          </p>
          <p className=" text-[2rem] ">{user.is_admin == 1 ? refus : solde}</p>
        </div>

        <div className="bg-blue-500 rounded text-white w-full mx-auto p-6">
          <p className=" text-[1.1rem] ">
            {user.is_admin == 1 ? "Demande(s) validé(s)" : "Solde total"}
          </p>
          <p className="text-[2rem] ">{user.is_admin == 1 ? valid : 5}</p>
        </div>  
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mt-3 py-2 px-3 bg-slate-100 rounded-md ">
          <div className="flex justify-between my-3">
            <h3 className="text-gray-900 text-3xl font-semibold">Mon profil</h3>
            <a
              href="#"
              onClick={() => setActiveSection("edit")}
              className="flex gap-2 items-center"
            >
              <FaUserEdit />
              Editer
            </a>
          </div>
          <div className="my-2 flex justify-around">
            <img
              src="./vite.svg"
              alt=""
              className="flex justify-center items-center"
            />
            <div className="text-[16px]">
              <p className="my-3">
                Nom: <span className="font-semibold">{user.name}</span>
              </p>
              <p className="my-3">
                Email: <span className="font-semibold">{user.email}</span>
              </p>
              <p className="my-3">
                Poste: <span className="font-semibold">{user.poste}</span>
              </p>
              <p className="my-3">
                Contact: <span className="font-semibold">{user.contact}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 py-2 px-3 bg-slate-100 rounded-md">
          <Chartify />
        </div>
      </div>
    </div>
  );
}

export default Profile;
