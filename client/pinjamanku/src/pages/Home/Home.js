import { message, List } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ListItemPinjam, Navbar } from "../../components";
import { fetchLoan } from "../../store/Pinjaman/action";
import BorrowerLoanModal from "../Borrower/borrowerLoanModal";
import log from "./img/log.svg";

export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModalVisible, setShowModalVisible] = useState(false);
  const {
    isLoanLoading,
    isLoanSuccess,
    isLoanError,
    isRegisterUserSuccess,
    isBorrowerAmountLoading,
    isBorrowerAmountSuccess,
    isBorrowerAmountError,
  } = useSelector((state) => state.pinjamanku);

  useEffect(() => {
    if (isBorrowerAmountSuccess && showModalVisible === false) {
      setShowModalVisible(true);
    }
  }, [isBorrowerAmountSuccess]);

  useEffect(() => {
    if (!!isBorrowerAmountError) {
      message.error(isBorrowerAmountError?.message ?? "something went wrong");
    }
  }, [isBorrowerAmountError]);

  useEffect(() => {
    dispatch(fetchLoan());
  }, []);

  useEffect(() => {
    if (!!isLoanError) {
      message.error(isLoanError?.message ?? "something went wrong");
    }
  }, [isLoanError]);

  function register() {
    history.push(`/register`);
  }
  function interviewUser() {
    localStorage.clear();
    history.push(`/login`);
  }
  return (
    <div>
      <Navbar />

      {localStorage.getItem("access_token") ? (
        <section class="hero-container container mt-4">
          <div className="col-md-4 ps-5">
            <div>
              <h1>Wellcome!!</h1>
            </div>
          </div>
          <img src={log} alt="hero" />
        </section>
      ) : (
        <div>
          <section class="hero-container container mt-4">
            <div className="col-md-4 ps-5">
              <div>
                <h2>Need fast and secure financial help?</h2>
              </div>
              {localStorage.getItem("dailyCo") ? (
                <a
                  href={localStorage.getItem("dailyCo")}
                  target="_blank"
                  class="btn btn-register btn-in"
                  onClick={() => {
                    interviewUser();
                  }}
                >
                  INTERVIEW NOW
                  {" >"}
                </a>
              ) : (
                // </button>
                <button class="btn-login" onClick={() => register()}>
                  Register Now
                </button>
              )}
            </div>

            <img src={log} alt="hero" />
          </section>
          <section className="mt-3">
            <div className="m-5 text-center">
              <h1>Why Pinjamanku?</h1>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-3 m-1">
                <div className="">
                  <div className="card-body">
                    <h4 className="card-text">Care</h4>
                    <h5 className="card-title">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="currentColor"
                        class="bi bi-check-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                      </svg>
                    </h5>

                    <p className="card-text">
                      We are always here to help you! 24/7 Customer Support team
                      that are ready to help you in time of needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 m-1">
                <div className="">
                  <div className="card-body">
                    <h4 className="card-text">Safety</h4>
                    <h5 className="card-title">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="currentColor"
                        className="bi bi-shield-shaded"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 14.933a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.607-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067v13.866zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"
                        />
                      </svg>
                    </h5>

                    <p className="card-text">
                      Your transactions and risk has been calculated by our
                      team. Our platform can guarantee your financial security.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 m-1">
                <div className="">
                  <div className="card-body">
                    <h5 className="card-title">
                      <h4 className="card-text">Fast</h4>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="currentColor"
                        class="bi bi-cloud-haze"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.5 3a4.002 4.002 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 12H4.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 3zM0 7.5A.5.5 0 0 1 .5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm2 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-2 4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </h5>

                    <p className="card-text">
                      Lending and investing has never been faster! With instant
                      1:1 interview your account will be eligible to loan and
                      invest faster!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <section className="mt-3">
        <div className="m-5 text-center">
          <h1>Available Loans</h1>
        </div>
        <List
          dataSource={isLoanSuccess.filter((item) => item?.status === "active")}
          loading={isLoanLoading}
          renderItem={(item) => <ListItemPinjam item={item} />}
        ></List>
      </section>
      {/* Lander Section */}
      <BorrowerLoanModal
        isModalVisible={showModalVisible}
        data={isBorrowerAmountSuccess}
        handleCancel={() => {
          setShowModalVisible(false);
        }}
        handleOk={() => {
          setShowModalVisible(false);
        }}
      />
    </div>
  );
}
