import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useState } from "react";
import { Navbar } from "../../components";
import { landerInvest } from "../../store/Pinjaman/action";
import PaymentModal from "./paymentModal";
import login from "./img/log.svg";

export default function AddLoan() {
  const dispatch = useDispatch();
  const { isLanderInvestLoading, isLanderInvestSuccess, isLanderInvestError } =
    useSelector((state) => state.pinjamanku);
  const [amount, setAmount] = useState(null);
  const [tenor, setTenor] = useState(null);
  const [showModalVisible, setShowModalVisible] = useState(false);

  useEffect(() => {
    if (typeof isLanderInvestSuccess?.invoiceURL === "string") {
      setAmount("");
      setTenor("");
      message.success("Success Add Loan");
      setShowModalVisible(true);
    }
  }, [isLanderInvestSuccess]);

  useEffect(() => {
    if (!!isLanderInvestError) {
      message.error(isLanderInvestError?.message ?? "something went wrong");
    }
  }, [isLanderInvestError]);

  const onAddLoan = (e) => {
    e.preventDefault();
    dispatch(landerInvest({ amount, tenor }));
  };

  return (
    <div>
      <Navbar />
      <div className="container-user" style={{ "margin-top": "-7%" }}>
        <div className="img">
          <img src={login} />
        </div>
        <div className="login-content">
          <form
            onSubmit={(e) => {
              onAddLoan(e);
            }}
          >
            <h2 className="title">Add LOan</h2>

            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <select
                  className="form-select select-input"
                  aria-label="Default select example"
                  placeholder="BankCode"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  value={amount}
                >
                  <option selected disabled>
                    Loan Value
                  </option>
                  <option value="1000.000">1.000.000</option>
                  <option value="3000.000">3.000.000</option>
                  <option value="5000.000">5.000.000</option>
                </select>
              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="number"
                  className="input"
                  placeholder="Jangka Waktu dalam Bulan"
                  value={tenor}
                  onChange={(e) => {
                    setTenor(e.target.value);
                  }}
                />
              </div>
            </div>

            <input type="submit" className="btn-login" value="ADD LOAN" />
          </form>
        </div>
      </div>

      <PaymentModal
        isModalVisible={showModalVisible}
        invoiceURL={isLanderInvestSuccess?.invoiceURL}
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
