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
    history.push(`/`);
  }

  return (
    <nav class="navbar">
      <h1>PinjamanKu</h1>
      <div class="nav-menu">
        <a class="nav-link" href="">
          Home
        </a>
        <a class="nav-link" href="">
          My Portofolio
        </a>
        <a class="nav-link" href="">
          Login
        </a>
        <a class="nav-link" href="">
          Logout
        </a>
      </div>
    </nav>
  );
}
