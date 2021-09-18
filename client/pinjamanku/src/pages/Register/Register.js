import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from 'antd'
import { fetchBorrower } from "../../store/Borrower/action";

export default function Register() {
  const dispatch = useDispatch()
  const { isBorrowerLoading, isBorrowerSucces, isBorrowerError } = useSelector((state) => state.borrower)

  useEffect(() => {
    dispatch(fetchBorrower())
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
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
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
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <div className="mb-3">
                  <label for="formFile" className="form-label">
                    Default file input example
                  </label>
                  <input className="form-control" type="file" id="formFile" />
                </div>
                <div className="mb-3">
                  <label for="formFile" className="form-label">
                    Default file input example
                  </label>
                  <input className="form-control" type="file" id="formFile" />
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
