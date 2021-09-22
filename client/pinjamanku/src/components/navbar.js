import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
export default function Navbar() {
  const history = useHistory();
  function goLender(e) {
    e.preventDefault();
    history.push("/lender");
  }
  function goBorrower(e) {
    e.preventDefault();
    history.push("/borrower");
  }
  function home(e) {
    history.push(`/`);
  }

  function login(e) {
    history.push(`/login`);
  }

  function logout(e) {
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
      <h1>
        <a
          style={{ color: "inherit", fontSize: 25 }}
          href=""
          onClick={(e) => home(e)}
        >
          PinjamanKu
        </a>
      </h1>
      <div class="nav-menu">
        {!localStorage.getItem("access_token") ? (
          ""
        ) : localStorage.getItem("role") === "lender" ? (
          <a class="nav-link" href="" onClick={(e) => goLender(e)}>
            My Portofolio
          </a>
        ) : (
          <a class="nav-link" href="" onClick={(e) => goBorrower(e)}>
            My Portofolio
          </a>
        )}
        {localStorage.getItem("access_token") ? (
          ""
        ) : (
          <a class="nav-link" href="" onClick={(e) => login(e)}>
            Login
          </a>
        )}

        {localStorage.getItem("access_token") ? (
          <a class="nav-link" href="" onClick={(e) => logout(e)}>
            Logout
          </a>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
