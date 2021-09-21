import { Navbar } from "../../components";
import { loginUser } from "../../store/user/action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import login from "./img/login.svg";
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
      <div class="container-user">
        <div class="img">
          <img src={login} />
        </div>
        <div class="login-content">
          <form
            onSubmit={(e) => {
              submitLogin(e);
            }}
          >
            <h2 class="title">LOGIN</h2>

            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <input
                  type="email"
                  class="input"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <input
                  type="password"
                  class="input"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <a
              href=""
              onClick={() => {
                history.push("/register");
              }}
            >
              Already Have AnAccount?
            </a>
            <input type="submit" class="btn-login" value="LOGIN" />
          </form>
        </div>
      </div>
    </div>
  );
}
