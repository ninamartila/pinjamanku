import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../store/user/action";
import { useState } from "react";
import login from "./img/log.svg";

import "./register.css";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [next, setNext] = useState(false);
  const [email, setEmail] = useState(""); //page2
  const [password, setPassword] = useState(""); //page2
  const [firstName, setFirstName] = useState(""); //page1
  const [lastName, setLastName] = useState(""); //page1
  const [phoneNumber, setPhoneNumber] = useState(""); //page1
  const [address, setAddress] = useState(""); //page1
  const [birthDate, setBirthDate] = useState(""); //page1
  const [bankCode, setBankCode] = useState(""); //page2
  const [holderName, setHolderName] = useState(""); //page2
  const [accountNumber, setAccountNumber] = useState("");
  const [occupation, setOcupation] = useState("");
  const [role, setRole] = useState("");
  const { isUserLoading, isUserSuccess, isUserError } = useSelector(
    (state) => state.user
  );
  function funcNext(e) {
    e.preventDefault();
    setNext(true);
  }
  function submitRegister(e) {
    e.preventDefault();
    let newData = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      birthDate,
      bankCode,
      holderName,
      accountNumber,
      occupation,
      role,
    };
    console.log(newData);
    dispatch(registerUser(newData)).then((data) => {
      if (role === "borrower") {
        history.push("/pendana");
      } else if (role === "lender") {
        history.push("/lander");
      }
    });
  }

  // useEffect(() => {
  //   // dispatch(fetchUser());
  // }, []);

  // useEffect(() => {
  //   if (!!isUserError) {
  //     message.error(isUserError?.message ?? "something went wrong");
  //   }
  // }, [isUserError]);

  return (
    <div>
      <div className="container-user">
        <div className="img">
          <img src={login} />
        </div>
        <div className="login-content">
          <form
            onSubmit={(e) => {
              submitRegister(e);
            }}
          >
            <h2 className="title">Register</h2>

            {!next ? (
              <div>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="FirstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="LastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="PhoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="Ocupation"
                      value={occupation}
                      onChange={(e) => setOcupation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <input
                      type="date"
                      className="input"
                      value={birthDate}
                      placeholder="BirthDate"
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                </div>{" "}
              </div>
            ) : (
              <div>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <input
                      type="email"
                      className="input"
                      placeholder="Email"
                      value={email}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="AccountNumber"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="HolderName"
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <select
                      className="form-select select-input"
                      aria-label="Default select example"
                      placeholder="BankCode"
                      onChange={(e) => setBankCode(e.target.value)}
                    >
                      <option selected disabled>
                        Select Bank Code
                      </option>
                      <option value="1">BRI</option>
                      <option value="2">BCA</option>
                      <option value="3">MANDIRI</option>
                    </select>
                  </div>
                </div>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <select
                      className="form-select select-input"
                      aria-label="Default select example"
                      placeholder="BankCode"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option selected disabled>
                        Select Your Role
                      </option>
                      <option value="borrower">BORROWER</option>
                      <option value="lender">LENDER</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            <a href="" onClick={() => history.push("/login")}>
              Already Have AnAccount?
            </a>
            {!next ? (
              <button className="btn-register" onClick={(e) => funcNext(e)}>
                {"NEXT >"}
              </button>
            ) : (
              <input type="submit" className="btn-register" value="Register" />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
