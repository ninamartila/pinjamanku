import { message, List, Empty } from "antd";
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
  const [showModalVisible, setShowModalVisible] = useState(false)
  const {
    isLoanLoading,
    isLoanSuccess,
    isLoanError,
    isRegisterUserSuccess,
    isBorrowerAmountLoading,
    isBorrowerAmountSuccess,
    isBorrowerAmountError,
  } =
    useSelector((state) => state.pinjamanku);

  useEffect(() => {
    if (isBorrowerAmountSuccess && showModalVisible === false) {
      setShowModalVisible(true)
    }
  }, [isBorrowerAmountSuccess])

  useEffect(() => {
    if (!!isBorrowerAmountError) {
      message.error(isBorrowerAmountError?.message ?? 'something went wrong');
    }
  }, [isBorrowerAmountError])

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
        ""
      ) : (
        <div>
          {" "}
          <section class="hero-container container mt-4">
            <div className="col-md-4 ps-5">
              <div>
                <h1>Finance Problem?</h1>
              </div>
              {localStorage.getItem("dailyCo") ? (
                // <button
                //   class="btn text-center"
                //   onClick={(e) => e.preventDefault()}
                // >
                <a
                  href={localStorage.getItem("dailyCo")}
                  target="_blank"
                  class="btn btn-register btn-in"
                  onClick={() => {
                    interviewUser();
                  }}
                >
                  GO INTERVIEW
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
                  <div className="card-body ">
                    <h5 className="card-title">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="currentColor"
                        className="bi bi-cash-stack"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                      </svg>
                    </h5>
                    <p className="card-text" style={{ fontSize: 18 }}>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 m-1">
                <div className="">
                  <div className="card-body">
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
                    <p className="card-text" style={{ fontSize: 18 }}>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 m-1">
                <div className="">
                  <div className="card-body">
                    <h5 className="card-title">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="currentColor"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    </h5>
                    <p className="card-text" style={{ fontSize: 18 }}>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>{" "}
        </div>
      )}

      <section className="mt-3">
        <div className="m-5 text-center">
          <h1>Available Loans</h1>
        </div>
        <List
          dataSource={isLoanSuccess.filter((item) => item?.status === "active")}
          loading={isLoanLoading}
          locale={{
            emptyText: <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 200,
              }} />
          }}
          renderItem={(item) => <ListItemPinjam item={item} isLoading={isBorrowerAmountLoading} />}
        ></List>
      </section>
      {/* Lander Section */}
      <BorrowerLoanModal isModalVisible={showModalVisible} data={isBorrowerAmountSuccess} handleCancel={() => {
        setShowModalVisible(false)
      }} handleOk={() => {
        setShowModalVisible(false)
      }} />
    </div>
  );
}
