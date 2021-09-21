import { message, Tabs } from "antd";
import { List } from "antd";
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
      setShowModalVisible(true)
    }
  }, [isLanderGetAmountSuccess])

  useEffect(() => {
    if (!!isLanderGetAmountError) {
      message.error(isLanderGetAmountError?.message ?? 'something went wrong Modal Loan');
    }
  }, [isLanderGetAmountError])

  useEffect(() => {
    dispatch(fetchLoan())
  }, [])

  useEffect(() => {
    if (!!isLoanError) {
      message.error(isLoanError?.message ?? 'something went wrong on User');
    }
  }, [isLoanError])

  return (
    <div>
      <Navbar />
      <section className="hero-borrower d-flex flex-column justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-3">
              <h1>hii there!</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                fugit obcaecati ea officiis optio porro quaerat? Numquam esse,
                nobis alias dolor vero architecto veniam ab doloremque illo
                quas. Magnam, atque?
              </p>
            </div>
          </div>
        </div>
      </section>
      <Tabs defaultActiveKey="1" style={{ paddingLeft: 10 }}>
        <TabPane tab="List Pinjaman Pending" key="1">
          <section className="container">
            <div className="m-3">
              <h4>Pinjaman Panding :</h4>
            </div>
            <List
              dataSource={isLoanSuccess.filter(item => item?.status === 'pending')}
              loading={isLoanLoading}
              renderItem={item => (
                <ListItemStatusPinjam item={item} />
              )}
            >
            </List>
          </section>
        </TabPane>
        <TabPane tab="List Sedang Dipinjam" key="2">
          <section className="container">
            <div className="m-3">
              <h4>Pinjaman Active :</h4>
            </div>
            <List
              dataSource={isLoanSuccess.filter(item => item?.status === 'active')}
              loading={isLoanLoading}
              renderItem={item => (
                <ListItemStatusPinjam item={item} />
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
              dataSource={isLoanSuccess.filter(item => item?.status === 'completed')}
              loading={isLoanLoading}
              renderItem={item => (
                <ListItemStatusPinjam item={item} />
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
