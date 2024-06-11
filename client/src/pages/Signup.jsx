import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Spinner from "../partials/Spinner";

function Signup() {
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken } = useStateContext();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setLoading(true);
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        // console.log(data.user);
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        const response = err.response;
        if (response && response.status === 422) {
          let error = response.data.errors;
          // console.log(error);
          Object.keys(error).map((k) => {
            if (k == "name") setErrorName(error[k][0]);
            if (k == "email") setErrorEmail(error[k][0]);
            if (k == "password") setErrorPassword(error[k][0]);
          });
        }
      });
  };
  return (
    <div className="mx-auto" style={{ marginTop: "10%", width: "80%" }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="login-wrap p-4 p-md-5">
            <h3
              className="mb-4 text-gray-600 text-2xl font-bold"
              style={{ textAlign: "center" }}
            >
              Créer un compte
            </h3>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Votre nom"
                  ref={nameRef}
                />
                {errorName && (
                  <span className="text-red-500 text-sm">{errorName}</span>
                )}
              </div>
              <div className="form-group ">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Votre email"
                  required
                  ref={emailRef}
                />
                {errorEmail && (
                  <span className="text-red-500 text-sm">{errorEmail}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Votre mot de passe"
                  ref={passwordRef}
                />
                {errorPassword && (
                  <span className="text-red-500 text-sm">{errorPassword}</span>
                )}
              </div>

              <div className="gap-2">
                <button
                  type="submit"
                  name=""
                  id=""
                  className="btn bg-slate-600 text-white w-full my-3 py-2.5 rounded-md"
                >
                  {loading ? (
                    <Spinner height={20} width={30} color="white" />
                  ) : (
                    <span>Créer un compte</span>
                  )}
                </button>
              </div>
              <div className="mx-auto">
                <Link to="/login" className="text-sm">
                  <span>J'ai déjà un compte</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
