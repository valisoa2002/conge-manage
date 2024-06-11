import "../styles/notfound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <main>
        <div className="container">
          <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-purple-500">404</h1>
            <h2 className="text-purple-400">Cette page est inexiste!!</h2>
            <Link className="btn" to="/">
              Revenir à l'accueil
            </Link>
            <div className="my-3">
              Designed by <a href="https://facebook.com/profile">Facebook</a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default NotFound;
