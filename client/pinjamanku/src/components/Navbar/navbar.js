export default function Navbar() {
  return (
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand m-2 " href="#">
            PinjamanKu
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul class="navbar-nav">
              <li class="nav-item m-2">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item m-2">
                <a class="nav-link" href="#">
                  Login
                </a>
              </li>
              <li class="nav-item m-2">
                <a class="nav-link" href="#">
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
