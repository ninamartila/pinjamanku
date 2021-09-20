import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../store/user/action";
import { useState } from "react";
import { Navbar } from "../../components";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [occupation, setOcupation] = useState("");
  const [role, setRole] = useState("");
  const { isUserLoading, isUserSuccess, isUserError } = useSelector(
    (state) => state.user
  );
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
    dispatch(registerUser(newData)).then((data) => {
      console.log(data);
      if (data.dataValues.role === "borrower") {
        history.push("/pendana");
      } else if (data.dataValues.role === "lender") {
        history.push("/lender");
      }
    });
  }

  useEffect(() => {
    // dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (!!isUserError) {
      message.error(isUserError?.message ?? "something went wrong");
    }
  }, [isUserError]);

  // console.log(isUserSuccess, '-------');
  return (
    <div>
      <Navbar />
      <section className="register d-flex flex-column justify-content-center">
        <div className="container">
          <div className="row justify-content-end ">
            <div>{/* <p>{isUserSuccess?.toString()}</p> */}</div>
            <div className="col-md-6 m-3 card register-card">
              <div className="p-5">
                <h1>PinjamanKu</h1>
                <form
                  onSubmit={(e) => {
                    submitRegister(e);
                  }}
                >
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

                  <button type="submit" className="btn btn-primary">
                    Register
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
