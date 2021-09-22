import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
export default function Navbar() {
  const history = useHistory();

  function home() {
    history.push(`/`);
  }

  function login() {
    history.push(`/login`);
  }

  function logout() {
    localStorage.clear();
    Swal.fire({
      title: "Logout success!",
      text: "See You!",
      icon: "success",
      confirmButtonText: "Cool",
    });
    history.push(`/`);
  }

  return (
    <nav class="navbar">
      <h1><a style={{color: "inherit", fontSize: 25}} href="" onClick={() => home()}>PinjamanKu</a></h1>
      <div class="nav-menu">
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
