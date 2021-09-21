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
    dispatch(loginUser(newData))
      .then((data) => {
        console.log(data);
        if (data.role === "borrower") {
          history.push("/pendana");
        } else if (data.role === "lender") {
          history.push("/lender");
        } else {
          console.log("mybi admin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="container-user">
        <div className="img">
          <img src={login} />
        </div>
        <div className="login-content">
          <form
            onSubmit={(e) => {
              submitLogin(e);
            }}
          >
            <h2 className="title">LOGIN</h2>

            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="password"
                  className="input"
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
            <input type="submit" className="btn-login" value="LOGIN" />
          </form>
        </div>
      </div>
    </div>
  );
}
