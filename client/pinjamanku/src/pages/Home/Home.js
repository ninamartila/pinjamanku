export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section class="hero d-flex flex-column justify-content-center">
        <div class="container">
          <div class="row">
            <div class="col-md-6 m-3">
              <h1>hii there!</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                fugit obcaecati ea officiis optio porro quaerat? Numquam esse,
                nobis alias dolor vero architecto veniam ab doloremque illo
                quas. Magnam, atque?
              </p>
              <a href="index.html" class="btn1">
                Register
              </a>
            </div>
          </div>
        </div>
      </section>
      {/*Akhir Hero Section */}

      {/* Banner Section */}

      <section class="mt-3">
        <div class="m-5 text-center">
          <h1>Why Choose Us?</h1>
        </div>
        <div class="row justify-content-center text-center">
          <div class="col-md-3 m-1">
            <div class="">
              <div class="card-body ">
                <h5 class="card-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="currentColor"
                    class="bi bi-cash-stack"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                  </svg>
                </h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3 m-1">
            <div class="">
              <div class="card-body">
                <h5 class="card-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="currentColor"
                    class="bi bi-shield-shaded"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 14.933a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.607-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067v13.866zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"
                    />
                  </svg>
                </h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3 m-1">
            <div class="">
              <div class="card-body">
                <h5 class="card-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                </h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Akhir Banner Section */}

      {/* Lander Section */}
      <section class="mt-3">
        <div class="m-5 text-center">
          <h1>Wanna Lander Now?</h1>
        </div>
        <div class="row justify-content-center ">
          <div class="card col-md-8  m-3">
            <div class="card-body  m-3">
              <div class="row justify-content-between">
                <div class="col-md-2">
                  <h5>Lander :</h5>
                  <p>dewa@mail.com</p>
                </div>
                <div class="col-md-2">
                  <h5>Total :</h5>
                  <p>Rp. 1.200.000</p>
                </div>
                <div class="col-md-2">
                  <h5>Bunga :</h5>
                  <p>8%</p>
                </div>
                <div class="col-md-2">
                  <h5>Jangka :</h5>
                  <p>6-bulan</p>
                </div>
                <div class="col-md-2  justify-content-center text-center">
                  <button class="btn btn-primary">GasPinjam</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card col-md-8  m-3">
            <div class="card-body  m-3">
              <div class="row justify-content-between">
                <div class="col-md-2">
                  <h5>Lander :</h5>
                  <p>dewa@mail.com</p>
                </div>
                <div class="col-md-2">
                  <h5>Total :</h5>
                  <p>Rp. 1.200.000</p>
                </div>
                <div class="col-md-2">
                  <h5>Bunga :</h5>
                  <p>8%</p>
                </div>
                <div class="col-md-2">
                  <h5>Jangka :</h5>
                  <p>6-bulan</p>
                </div>
                <div class="col-md-2  justify-content-center text-center">
                  <button class="btn btn-primary">GasPinjam</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card col-md-8  m-3">
            <div class="card-body  m-3">
              <div class="row justify-content-between">
                <div class="col-md-2">
                  <h5>Lander :</h5>
                  <p>dewa@mail.com</p>
                </div>
                <div class="col-md-2">
                  <h5>Total :</h5>
                  <p>Rp. 1.200.000</p>
                </div>
                <div class="col-md-2">
                  <h5>Bunga :</h5>
                  <p>8%</p>
                </div>
                <div class="col-md-2">
                  <h5>Jangka :</h5>
                  <p>6-bulan</p>
                </div>
                <div class="col-md-2  justify-content-center text-center">
                  <button class="btn btn-primary">GasPinjam</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card col-md-8  m-3">
            <div class="card-body  m-3">
              <div class="row justify-content-between">
                <div class="col-md-2">
                  <h5>Lander :</h5>
                  <p>dewa@mail.com</p>
                </div>
                <div class="col-md-2">
                  <h5>Total :</h5>
                  <p>Rp. 1.200.000</p>
                </div>
                <div class="col-md-2">
                  <h5>Bunga :</h5>
                  <p>8%</p>
                </div>
                <div class="col-md-2">
                  <h5>Jangka :</h5>
                  <p>6-bulan</p>
                </div>
                <div class="col-md-2  justify-content-center text-center">
                  <button class="btn btn-primary">GasPinjam</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Lander Section */}
    </div>
  );
}
