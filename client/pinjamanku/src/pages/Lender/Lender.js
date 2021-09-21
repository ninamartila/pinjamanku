import { message, Tabs } from "antd";
import { List, PageHeader, Button, Statistic, Descriptions } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItemStatusPinjam, Navbar } from "../../components";
import { fetchLoan } from "../../store/Pinjaman/action";
import LenderAmountModal from "./LenderAmountModal";
import BorrowerPayModal from "../Borrower/borrowerPayModal";

const { TabPane } = Tabs;

export default function Lender() {
  const dispatch = useDispatch()
  const [showModalVisible, setShowModalVisible] = useState(false)
  const [showModalPayVisible, setShowModalPayVisible] = useState(false)
  const {
    isLoanLoading,
    isLoanSuccess,
    isLoanError,
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
    dispatch(fetchLoan());
  }, []);

  useEffect(() => {
    if (!!isLoanError) {
      message.error(isLoanError?.message ?? "something went wrong on User");
    }
  }, [isLoanError]);

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
              <h2>Hi..... "Dewa Indra"</h2>
            </div>
            <div className="row justify-content-between">
              <div className="col-md-4">
                <h5>No Rek : 1234567789 (BRI)</h5>
              </div>

              <div className="col-md-4 d-flex flex-col">
                <h5>Email : </h5>
                <p> madun@gmail.com</p>
              </div>
              <div className="col-md-4 d-flex flex-col">
                <h5>Terkumpul : </h5>
                <p> Rp. 200.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="1" style={{ paddingLeft: 10 }}>
        <TabPane tab="List Pinjaman Pending" key="1">
          <section className="container">
            <div className="m-3">
              <h4>Pinjaman Panding :</h4>
            </div>
            <List
              dataSource={isLoanSuccess.filter(
                (item) => item?.status === "pending"
              )}
              loading={isLoanLoading}
              renderItem={(item) => <ListItemStatusPinjam item={item} />}
            ></List>
          </section>
        </TabPane>
        <TabPane tab="List Sedang Dipinjam" key="2">
          <section className="container">
            <div className="m-3">
              <h4>Pinjaman Active :</h4>
            </div>
            <List
              dataSource={isLoanSuccess.filter(
                (item) => item?.status === "active"
              )}
            >
            </List>
            <List
              dataSource={isLoanSuccess.filter(item => item?.status === 'borrowed')}
              loading={isLoanLoading}
              renderItem={item => (
                <ListItemStatusPinjam item={item} />
              )}
            >
            </List>
          </section>
        </TabPane>
        <TabPane tab="List Pinjaman Selesai" key="3">
          <section className="container">
            <div className="m-3">
              <h4>Pinjaman Selesai :</h4>
            </div>
            <List
              dataSource={isLoanSuccess.filter(
                (item) => item?.status === "completed"
              )}
            >
            </List>
            <List
              dataSource={isLoanSuccess.filter(item => item?.status === 'withdrawn')}
              loading={isLoanLoading}
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
