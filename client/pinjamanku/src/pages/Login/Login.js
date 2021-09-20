import { Navbar } from "../../components";
import { loginUser } from "../../store/user/action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function submitLogin(e) {
    e.preventDefault();
    let newData = {
      email,
      password,
    };
    dispatch(loginUser(newData)).then((data) => {
      if (data.role === "borrower") {
        history.push("/pendana");
      } else if (data.role === "lender") {
        history.push("/lender");
      }
    });
  }

  return (
    <div>
      <Navbar />
      <section className="login d-flex flex-column justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-3 card login-card">
              <div className="p-5">
                <h1>PinjamanKu</h1>
                <form
                  onSubmit={(e) => {
                    submitLogin(e);
                  }}
                >
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" for="exampleCheck1">
                      Check me out
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
