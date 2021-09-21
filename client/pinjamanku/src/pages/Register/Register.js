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
      console.log(data);
      if (data.dataValues.role === "borrower") {
        history.push("/pendana");
      } else if (data.dataValues.role === "lender") {
        history.push("/lender");
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

  // console.log(isUserSuccess, '-------');
  return (
    <div>
      <div class="container-user">
        <div class="img">
          <img src={login} />
        </div>
        <div class="login-content">
          <form
            onSubmit={(e) => {
              submitRegister(e);
            }}
          >
            <h2 class="title">Register</h2>

            {!next ? (
              <div>
                <div class="input-div one">
                  <div class="i">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                    <input
                      type="text"
                      class="input"
                      placeholder="FirstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div class="input-div one">
                  <div class="i">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                    <input
                      type="text"
                      class="input"
                      placeholder="LastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div class="input-div one">
                  <div class="i">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                    <input
                      type="text"
                      class="input"
                      placeholder="PhoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div class="input-div one">
                  <div class="i">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                    <input
                      type="text"
                      class="input"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div class="input-div one">
                  <div class="i">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                    <input
                      type="text"
                      class="input"
                      placeholder="Ocupation"
                      value={occupation}
                      onChange={(e) => setOcupation(e.target.value)}
                    />
                  </div>
                </div>
                <div class="input-div one">
                  <div class="i">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                    <input
                      type="date"
                      class="input"
                      value={birthDate}
                      placeholder="BirthDate"
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                </div>{" "}
              </div>
            ) : (
              <div>
                <div class="input-div one">
                  <div class="i">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                    <input
                      type="email"
                      class="input"
                      placeholder="Email"
                      value={email}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div class="input-div one">
                  <div class="i">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                    <input
                      type="text"
                      class="input"
                      placeholder="AccountNumber"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div class="input-div one">
                  <div class="i">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                    <input
                      type="text"
                      class="input"
                      placeholder="HolderName"
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value)}
                    />
                  </div>
                </div>
                <div class="input-div one">
                  <div class="i">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                    <select
                      class="form-select select-input"
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
                <div class="input-div one">
                  <div class="i">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="div">
                    <select
                      class="form-select select-input"
                      aria-label="Default select example"
                      placeholder="BankCode"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option selected disabled>
                        Select Your Role
                      </option>
                      <option value="borrower">BORROWER</option>
                      <option value="lander">LANDER</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            <a href="" onClick={() => history.push("/login")}>
              Already Have AnAccount?
            </a>
            {!next ? (
              <button class="btn-register" onClick={(e) => funcNext(e)}>
                {"NEXT >"}
              </button>
            ) : (
              <input type="submit" class="btn-register" value="Register" />
            )}

            {/* <input type="submit" class="btn-register" value="Next" /> */}
          </form>
        </div>
      </div>
      {/* <section className="register d-flex flex-column justify-content-center">
        <div className="container">
          <div className="row justify-content-end ">
            <div></div>
            <div className="col-md-12 m-3 card register-card">
              <div className="p-5">
                <h1>PinjamanKu</h1>
                <form
                  onSubmit={(e) => {
                    submitRegister(e);
                  }}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">firstName</label>
                        <input
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">LastName</label>
                        <input
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">phoneNumber</label>
                        <input
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                          onChange={(e) => setAddress(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">birthDate</label>
                        <input
                          onChange={(e) => setBirthDate(e.target.value)}
                          type="date"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          for="exampleInputPassword1"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">BankCode</label>
                        <input
                          onChange={(e) => setBankCode(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">holderName</label>
                        <input
                          onChange={(e) => setHolderName(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">accountNumber</label>
                        <input
                          onChange={(e) => setAccountNumber(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">occupation</label>
                        <input
                          onChange={(e) => setOcupation(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option selected disabled>
                            {" "}
                            ---Select Your Role---
                          </option>
                          <option value="borrower">Borrower</option>
                          <option value="lender">Lander</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
