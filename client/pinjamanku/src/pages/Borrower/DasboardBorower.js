import { message, Tabs, List } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItemStatusPinjam, Navbar, BorrowerItemCard } from "../../components";
import { fetchLoan, fetchLoanBorrower } from "../../store/Pinjaman/action";
import BorrowerPayModal from "./borrowerPayModal";

const { TabPane } = Tabs;

export default function DasboardBorower() {
  const dispatch = useDispatch()
  const [showModalPayVisible, setShowModalPayVisible] = useState(false)
  const {
    isLoanLoading,
    isLoanSuccess,
    isLoanError,
    isBorrowerLoanLoading,
    isBorrowerLoanSuccess,
    isBorrowerLoanError,
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
    dispatch(fetchLoanBorrower());
  }, []);

  useEffect(() => {
    if (!!isBorrowerLoanError) {
      message.error(isBorrowerLoanError?.message ?? "something went wrong");
    }
  }, [isBorrowerLoanError]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card col-md-12  m-3">
          <div className="card-body  m-3">
            <div className="row d-flex flex-row">
              <h2>Hi, "Dewa Indra"</h2>
            </div>
            <div className="row justify-content-between">
              <div className="col-md-4">
                <h5>Acc. Number: 1234567789 (BRI)</h5>
              </div>

              <div className="col-md-4 d-flex flex-col">
                <h5>Email: </h5>
                <p> madun@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="1" style={{ paddingLeft: 10 }}>
        <TabPane tab="Current Loan" key="2">
          <section className="container">
            <div className="m-3">
              <h4>Currently borrowed:</h4>
            </div>
            <List
              dataSource={isBorrowerLoanSuccess.filter(
                (item) => item?.status === "active"
              )}
            >
            </List>
            <List
              dataSource={isBorrowerLoanSuccess.filter(item => item?.status === 'borrowed')}
              loading={isBorrowerLoanLoading}
              renderItem={item => (
                <BorrowerItemCard item={item} />
              )}
            >
            </List>
          </section>
        </TabPane>
        <TabPane tab="Completed Loan" key="3">
          <section className="container">
            <div className="m-3">
              <h4>Completed :</h4>
            </div>
            <List
              dataSource={isBorrowerLoanSuccess.filter(item => item?.status === 'withdrawn')}
              loading={isBorrowerLoanLoading}
              renderItem={item => (
                <BorrowerItemCard item={item} />
              )}
            >
            </List>
          </section>
        </TabPane>
      </Tabs >
      <BorrowerPayModal isModalVisible={showModalPayVisible} invoiceURL={isBorrowerPaySuccess?.invoiceURL} handleCancel={() => {
        setShowModalPayVisible(false)
      }} handleOk={() => {
        setShowModalPayVisible(false)
      }} />
    </div >
  );
}
