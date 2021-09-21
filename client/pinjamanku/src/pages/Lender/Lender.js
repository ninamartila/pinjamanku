import { message, Tabs } from "antd";
import { List, PageHeader, Button, Statistic, Descriptions } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItemStatusPinjam, Navbar } from "../../components";
import { fetchLoanLender } from "../../store/Pinjaman/action";
import LenderAmountModal from "./LenderAmountModal";
import BorrowerPayModal from "../Borrower/borrowerPayModal";

const { TabPane } = Tabs;

export default function Lender() {
  const dispatch = useDispatch()
  const [showModalVisible, setShowModalVisible] = useState(false)
  const [showModalPayVisible, setShowModalPayVisible] = useState(false)
  const {
    isLenderLoanLoading,
    isLenderLoanSuccess,
    isLenderLoanError,
    isLanderGetAmountLoading,
    isLanderGetAmountSuccess,
    isLanderGetAmountError,
    isBorrowerPayLoading,
    isBorrowerPaySuccess,
    isBorrowerPayError
  } = useSelector((state) => state.pinjamanku)

  useEffect(() => {
    // console.log({ isBorrowerPaySuccess })
    if (typeof isBorrowerPaySuccess?.invoiceURL === 'string') {
      setShowModalPayVisible(true)
    }
  }, [isBorrowerPaySuccess])

  useEffect(() => {
    if (!!isBorrowerPayError) {
      message.error(isBorrowerPayError?.message ?? 'something went wrong');
    }
  }, [isBorrowerPayError])

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
    dispatch(fetchLoanLender());
  }, []);

  useEffect(() => {
    if (!!isLenderLoanError) {
      message.error(isLenderLoanLoading?.message ?? "something went wrong on User");
    }
  }, [isLenderLoanError]);

  const renderContent = (column = 2) => (
    <Descriptions size="small" column={column}></Descriptions>
  );

  return (
    <div className="">
      <Navbar />
      <div className="container">
        <div className="card col-md-12  m-3">
          <div className="card-body  m-3">
            <div className="row d-flex flex-row">
              <h2>Hi, Dharma!</h2>
            </div>
            <div className="row justify-content-between">
              <div className="col-md-4">
                <h5>Acc. Number: 1234567789 (BRI)</h5>
              </div>

              <div className="col-md-4 d-flex flex-col">
                <h5>Email: </h5>
                <p> madun@gmail.com</p>
              </div>
              <div className="col-md-4 d-flex flex-col">
                <h5>Available Balance : </h5>
                <p> IDR 200.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="1" style={{ paddingLeft: 10 }}>
        <TabPane tab="Pending" key="1">
          <section className="container">
            <div className="m-3">
              <h4>Pending Loans :</h4>
              <p>Loan investment that you need to pay</p>
            </div>
            {isLenderLoanSuccess.filter((el)=> console.log(el.status))}
            <List
              dataSource={isLenderLoanSuccess.filter(
                (item) => item?.status === "pending"
              )}
              loading={isLenderLoanLoading}
              renderItem={(item) => <ListItemStatusPinjam item={item} />}
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
              renderItem={(item) => <ListItemStatusPinjam item={item} />}
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
                <ListItemStatusPinjam item={item} />
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
                <ListItemStatusPinjam item={item} />
              )}
            >
            </List>
          </section>
        </TabPane>
      </Tabs>
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
