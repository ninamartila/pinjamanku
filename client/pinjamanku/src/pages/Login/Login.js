import { useState } from "react";
import {  LoginBorrower } from "../../store/Borrower/action";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function submitLogin(e) {
    e.preventDefault();
    let newPayload = {
      email: email,
      password: password,
    };
    dispatch( LoginBorrower(newPayload)).then().catch();
  }
  return (
    <section class="login d-flex flex-column justify-content-center">
    <div class="container">
      <div class="row">
        <div class="col-md-6 m-3 card login-card">
          <div class="p-5">
            <h1>PinjamanKu</h1>
            <form onSubmit={(e) => submitLogin(e)}>
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

              <button type="submit" class="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
