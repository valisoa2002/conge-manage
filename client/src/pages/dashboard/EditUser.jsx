import { useState } from "react";
import Swal from "sweetalert2";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

function EditUser() {
  const { user } = useStateContext();

  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    poste: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleEdit = () => {
    axiosClient
      .put(`/users/${user.id}`, data)
      .then(() => {
        Swal.fire({
          text: "Mis à jour effectué!!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center">
      <div className="mt-5 mx-4 p-4 w-3/5 rounded-md">
        <h3 className="text-gray-900 text-3xl font-semibold my-4">Editer</h3>

        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            // value={user.name}
            onChange={handleChange}
            placeholder="Votre nom...."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            //     value={user.email}
            onChange={handleChange}
            placeholder="Votre email..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Contact
          </label>
          <input
            type="text"
            className="form-control"
            name="contact"
            id="contact"
            //     value={user.email}
            onChange={handleChange}
            placeholder="Votre contact..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Poste
          </label>
          <input
            type="text"
            className="form-control"
            name="poste"
            id="poste"
            //     value={user.email}
            onChange={handleChange}
            placeholder="Votre poste..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleEdit}
            className="bg-gray-900 px-3 py-2 text-white font-medium rounded-md"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
