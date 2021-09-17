export default function DasboardBorower() {
  return (
    <div>
      <section class="hero-borrower d-flex flex-column justify-content-center">
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
            </div>
          </div>
        </div>
      </section>
      <section class="container">
        <div class="m-5">
          <h4>Pinjaman Active :</h4>
        </div>
        <div class="row justify-content-center">
          <div class="card col-md-12  m-3">
            <div class="card-body  m-3">
              <div class="row justify-content-between">
                <div class="col-md-4">
                  <h5>Total :</h5>
                  <p>Rp. 1.200.000</p>
                </div>
                <div class="col-md-4">
                  <h5>Angsuran Bulan ini :</h5>
                  <p>Rp. 200.000</p>
                </div>
                <div class="col-md-2">
                  <h5>Deadline :</h5>
                  <p>21-09-2021</p>
                </div>
              </div>
              <div class="row justify-content-between">
                <div class="col-md-4">
                  <h5>Cicilan Selama :</h5>
                  <p>6-bulan</p>
                </div>
                <div class="col-md-4">
                  <h5>Sisa Cicilan :</h5>
                  <p>3x</p>
                </div>

                <div class="col-md-2">
                  <h5>Status :</h5>
                  <button class="btn btn-danger">Belum Bayar</button>
                </div>
              </div>
            </div>
          </div>

          <div class="card col-md-12  m-3">
            <div class="card-body  m-3">
              <div class="row justify-content-between">
                <div class="col-md-4">
                  <h5>Total :</h5>
                  <p>Rp. 1.200.000</p>
                </div>
                <div class="col-md-4">
                  <h5>Angsuran Bulan ini :</h5>
                  <p>Rp. 200.000</p>
                </div>
                <div class="col-md-2">
                  <h5>Deadline :</h5>
                  <p>21-09-2021</p>
                </div>
              </div>
              <div class="row justify-content-between">
                <div class="col-md-4">
                  <h5>Cicilan Selama :</h5>
                  <p>6-bulan</p>
                </div>
                <div class="col-md-4">
                  <h5>Sisa Cicilan :</h5>
                  <p>3x</p>
                </div>

                <div class="col-md-2">
                  <h5>Status :</h5>
                  <button class="btn btn-success">Sudah Bayar</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="m-5">
          <h4>Pinjaman Selesai :</h4>
        </div>
        <div class="row justify-content-center">
          <div class="card col-md-12  m-3">
            <div class="card-body  m-3">
              <div class="row justify-content-between">
                <div class="col-md-4">
                  <h5>Total :</h5>
                  <p>Rp. 1.200.000</p>
                </div>
                <div class="col-md-4">
                  <h5>Angsuran Bulan ini :</h5>
                  <p>Rp. 200.000</p>
                </div>
                <div class="col-md-2">
                  <h5>Deadline :</h5>
                  <p>21-09-2021</p>
                </div>
              </div>
              <div class="row justify-content-between">
                <div class="col-md-4">
                  <h5>Cicilan Selama :</h5>
                  <p>6-bulan</p>
                </div>
                <div class="col-md-4">
                  <h5>Sisa Cicilan :</h5>
                  <p>3x</p>
                </div>
                <div class="col-md-2">
                  <h5>Status :</h5>
                  <button class="btn btn-warning">Lunas</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
