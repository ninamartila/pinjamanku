import { ListItemPinjam } from "../../components";

export default function TempatMinjam() {
  return (
    <div>
      <section className="hero-borrower d-flex flex-column justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-3">
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
      <section className="container">
        <div className="m-5 text-center">
          <h1>Silahkan Pilih Sesuka hati anda</h1>
        </div>
        <ListItemPinjam />
      </section>
    </div>
  );
}
