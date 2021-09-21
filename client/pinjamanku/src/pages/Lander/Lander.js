import { ListItemStatusPinjam, Navbar } from "../../components";
import logo from "../Register/img/log.svg";
export default function Lander() {
  return (
    <div>
      <Navbar />
      {/* <section class="description-container">
        <div className="container">
          <div className="col-md-12">
            <h2> long established</h2>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that....
            </p>
          </div>
        </div>
      </section> */}
      <section className="container">
        <div className="m-5">
          <h4>Pinjaman Active :</h4>
        </div>
        <ListItemStatusPinjam type={"active"} />

        <div className="m-5">
          <h4>Pinjaman Selesai :</h4>
        </div>
        <ListItemStatusPinjam type={"done"} />
      </section>
    </div>
  );
}
