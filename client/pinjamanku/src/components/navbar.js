import { useHistory } from "react-router-dom";
export default function Navbar() {
  const history = useHistory()

  function home() {
    history.push(`/home`)
  }

  function login() {
    history.push(`/login`)
  }

  function logout() {
    history.push(`/`)
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand m-2 " href="#">
            PinjamanKu
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item m-2">
                <a className="nav-link active" aria-current="page" onClick={() => home()}>
                  Home
                </a>
              </li>
              <li className="nav-item m-2">
                <a className="nav-link" onClick={() => login()}>
                  Login
                </a>
              </li>
              <li className="nav-item m-2">
                <a className="nav-link" onClick={() => logout()}>
                  LOG-OUT
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
