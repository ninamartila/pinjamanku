import { message, Tabs } from "antd";
import { List, PageHeader, Button, Statistic, Descriptions } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BorrowerItemCard, Navbar } from "../../components";
import { fetchLoanLender } from "../../store/Pinjaman/action";
import { fetchUserById } from "../../store/user/action";
import LenderAmountModal from "./LenderAmountModal";
import BorrowerPayModal from "../Borrower/borrowerPayModal";
import log from "./img/log.svg";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

export default function Lender() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [balance, setBalance] = useState("0");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bank, setBank] = useState("");
  const [code, setCode] = useState("");
  const [showModalVisible, setShowModalVisible] = useState(false);
  const [showModalPayVisible, setShowModalPayVisible] = useState(false);
  const {
    isLenderLoanLoading,
    isLenderLoanSuccess,
    isLenderLoanError,
    isLanderGetAmountLoading,
    isLanderGetAmountSuccess,
    isLanderGetAmountError,
    isBorrowerPayLoading,
    isBorrowerPaySuccess,
    isBorrowerPayError,
  } = useSelector((state) => state.pinjamanku);
  // function getBalance(balance) {
  //   let data = balance.filter((item) => {
  //     item.status === "complete";
  //   });
  //   return data;
  // }

  useEffect(() => {
    // console.log({ isBorrowerPaySuccess })
    if (typeof isBorrowerPaySuccess?.invoiceURL === "string") {
      setShowModalPayVisible(true);
    }
  }, [isBorrowerPaySuccess]);

  useEffect(() => {
    if (!!isBorrowerPayError) {
      message.error(isBorrowerPayError?.message ?? "something went wrong");
    }
  }, [isBorrowerPayError]);

  useEffect(() => {
    if (isLanderGetAmountSuccess && showModalVisible === false) {
      setShowModalVisible(true);
    }
  }, [isLanderGetAmountSuccess]);

  useEffect(() => {
    if (!!isLanderGetAmountError) {
      message.error(
        isLanderGetAmountError?.message ?? "something went wrong Modal Loan"
      );
    }
  }, [isLanderGetAmountError]);

  useEffect(() => {
    dispatch(fetchLoanLender()).then((data) => {
      let count = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === "complete") {
          count = count + data[i].initialLoan;
        }
      }
      setBalance(count);
    });
    dispatch(
      fetchUserById(localStorage.getItem("id"), localStorage.getItem("role"))
    ).then((data) => {
      console.log(data, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      setEmail(data.email);
      setBank(data.accountNumber);
      setCode(data.bankCode);
      setFirstName(data.firstName);
      setLastName(data.lastName);
    });
  }, []);

  useEffect(() => {
    if (!!isLenderLoanError) {
      message.error(
        isLenderLoanLoading?.message ?? "something went wrong on User"
      );
    }
  }, [isLenderLoanError]);

  function addLoan(e) {
    e.preventDefault();
    history.push('/lender/add-loan')
  }

  return (
    <div className="">
      <Navbar />

      <div className="container">
        <div className="card col-md-12  m-3">
          <div className="card-body  m-3">
            <div className="row d-flex flex-row">
              <div className="col-md-4  flex-col">
                <h2>Hi, {firstName} {lastName}!</h2>
              </div>
              <div className="col-md-4  flex-col">
                <h5>Email: </h5>
                <p> {email}</p>
              </div>
              <div className="col-md-4 text-center justify-content-center">
                <img src={log} width="50%"></img>
                {/* <h5>Available Balance : </h5>
                <p> IDR 200.000</p> */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5>Acc. Number :</h5>
                <p>
                  {bank} ({code})
                </p>
              </div>
              <div className="col-md-4 flex-col">
                <h5>Available Balance : </h5>
                <p> IDR {balance.toLocaleString("id-ID")}</p>
              </div>
              <div className="col-md-4  flex-col">
                <button class="btn-login" onClick={(e) => addLoan(e)}>
                  INVEST NOW!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Tabs defaultActiveKey="1" style={{ paddingLeft: 10 }}>
          <TabPane tab="Pending" key="1">
            <section className="container">
              <div className="m-3">
                <h4>Pending Loans :</h4>
                <p>Loan investment that you need to pay</p>
              </div>
              {isLenderLoanSuccess.filter((el) => console.log(el.status))}
              <List
                dataSource={isLenderLoanSuccess.filter(
                  (item) => item?.status === "pending"
                )}
                loading={isLenderLoanLoading}
                renderItem={(item) => <BorrowerItemCard item={item} />}
              ></List>
            </section>
          </TabPane>
          <TabPane tab="Active" key="2">
            <section className="container">
              <div className="m-3">
                <h4>Active Loans :</h4>
                <p>Available loan that is not yet borrowed</p>
              </div>
              <List
                dataSource={isLenderLoanSuccess.filter(
                  (item) => item?.status === "active"
                )}
                loading={isLenderLoanLoading}
                renderItem={(item) => <BorrowerItemCard item={item} />}
              ></List>
            </section>
          </TabPane>
          <TabPane tab="Borrowed" key="3">
            <section className="container">
              <div className="m-3">
                <h4>Loaned funds :</h4>
              </div>
              <List
                dataSource={isLenderLoanSuccess.filter(item => item?.status === 'borrowed' || item?.status === "deadline")}
                loading={isLenderLoanLoading}
                renderItem={item => (
                  <BorrowerItemCard item={item} />
                )}
              >
              </List>
            </section>
          </TabPane>
          <TabPane tab="Completed" key="4">
            <section className="container">
              <div className="m-3">
                <h4>Completed Loans :</h4>
              </div>
              <List
                dataSource={isLenderLoanSuccess.filter(item => item?.status === 'complete' || item?.status === 'withdrawn')}
                loading={isLenderLoanLoading}
                renderItem={item => (
                  <BorrowerItemCard item={item} />
                )}
              >
              </List>
            </section>
          </TabPane>
        </Tabs>
      </div>
      <LenderAmountModal isModalVisible={showModalVisible} data={isLanderGetAmountSuccess} handleCancel={() => {
        setShowModalVisible(false)
      }} handleOk={() => {
        setShowModalVisible(false)
      }} />
      <BorrowerPayModal isModalVisible={showModalPayVisible} invoiceURL={isBorrowerPaySuccess?.invoiceURL} handleCancel={() => {
        setShowModalPayVisible(false)
      }} handleOk={() => {
        setShowModalPayVisible(false)
      }} />
    </div>
  );
}
