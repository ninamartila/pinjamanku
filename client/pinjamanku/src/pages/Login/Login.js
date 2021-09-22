import { Navbar } from "../../components";
import { loginUser } from "../../store/user/action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import login from "./img/login.svg";
import { useState } from "react";
import Swal from "sweetalert2";

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
          Swal.fire({
            title: "Login success!",
            text: "Wellcome Back!",
            icon: "success",
            confirmButtonText: "Cool",
          });
          history.push("/pendana");
        } else if (data.role === "lender") {
          Swal.fire({
            title: "Login success!",
            text: "Wellcome Back!",
            icon: "success",
            confirmButtonText: "Cool",
          });
          history.push("/lender");
        } else {
          Swal.fire({
            title: "Login success!",
            text: "Wellcome Back!",
            icon: "success",
            confirmButtonText: "Cool",
          });
          console.log("mybi admin");
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "error!",
          text: "Email/Password Incorect",
          icon: "error",
          confirmButtonText: "Cool",
        });
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
              Already Have an Account?
            </a>
            <input type="submit" className="btn-login" value="LOGIN" />
          </form>
        </div>
      </div>
    </div>
  );
}
