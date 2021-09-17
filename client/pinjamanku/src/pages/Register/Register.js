import Bri from "../../Assets/Bri.png";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bank, setBank] = useState("");
  const [norek, setNoRek] = useState("");
  function submitRegister(e) {
    e.preventDefault();
    let newPayload = {
      email: email,
      password: password,
      bank: bank,
      norek: norek,
    };
    console.log(newPayload);
  }
  return (
    <section class="register d-flex flex-column justify-content-center">
      <div class="container">
        <div class="row justify-content-end ">
          <div class="col-md-6 m-3 card register-card">
            <div class="p-5">
              <h1>PinjamanKu</h1>
              <form onSubmit={(e) => submitRegister(e)}>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Select Bank : <img src={Bri} width="90px"></img>
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setBank(e.target.value)}
                  >
                    <option selected disabled>
                      --BankSelect--
                    </option>

                    <option value="BRI">BRI</option>
                    <option value="BCA">BCA</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">No Rekening</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setNoRek(e.target.value)}
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
