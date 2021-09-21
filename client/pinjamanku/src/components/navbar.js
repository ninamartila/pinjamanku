import { useHistory } from "react-router-dom";
export default function Navbar() {
  const history = useHistory();

  function home() {
    history.push(`/home`);
  }

  function login() {
    history.push(`/login`);
  }

  function logout() {
    localStorage.clear();
    history.push(`/`);
  }

  return (
    <nav class="navbar">
      <h1>PinjamanKu</h1>
      <div class="nav-menu">
        <a class="nav-link" href="" onClick={() => home()}>
          Home
        </a>
        {!localStorage.getItem("access_token") ? (
          ""
        ) : localStorage.getItem("role") === "lender" ? (
          <a class="nav-link" href="" onClick={() => history.push("/lender")}>
            My Portofolio
          </a>
        ) : (
          <a class="nav-link" href="" onClick={() => history.push("/pendana")}>
            My Portofolio
          </a>
        )}
        {localStorage.getItem("access_token") ? (
          ""
        ) : (
          <a class="nav-link" href="" onClick={() => login()}>
            Login
          </a>
        )}

        {localStorage.getItem("access_token") ? (
          <a class="nav-link" href="" onClick={() => logout()}>
            Logout
          </a>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
