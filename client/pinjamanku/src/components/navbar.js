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
        <p>Home</p>
        <p>My Portofolio</p>
        <p>Login</p>
        <p>Logout</p>
      </div>
    </nav>
  );
}
