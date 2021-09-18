import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from 'antd'
import { fetchBorrower, RegisterBorrower } from "../../store/Borrower/action";

export default function Register() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bank, setBank] = useState("");
  const [norek, setNoRek] = useState("");
  const { isBorrowerLoading, isBorrowerSucces, isBorrowerError } = useSelector((state) => state.borrower)
  function submitRegister(e) {
    e.preventDefault();
    let newPayload = {
      email: email,
      password: password,
      bank: bank,
      norek: norek,
    };
    dispatch(RegisterBorrower(newPayload)).then().catch();
  }

  useEffect(() => {
    // dispatch(fetchBorrower())
  }, [])

  useEffect(() => {
    if (!!isBorrowerError) {
      message.error(isBorrowerError?.message ?? 'something went wrong');
    }
  }, [isBorrowerError])

  return (
    <section className="register d-flex flex-column justify-content-center">
      <div className="container">
        <div className="row justify-content-end ">
          <div className="col-md-6 m-3 card register-card">
            <div className="p-5">
              <h1>PinjamanKu</h1>
              <form onSubmit={(e) => submitRegister(e)}>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Select Bank : <img src={Bri} width="90px"></img>
                  </label>
                  <select
                    className="form-select"
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
                <div className="mb-3">
                  <label className="form-label">No Rekening</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setNoRek(e.target.value)}
                  />
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
  );
}
