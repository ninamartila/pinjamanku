import { message, Tabs, List } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItemStatusPinjam, Navbar } from "../../components";
import { fetchLoanBorrower } from "../../store/Pinjaman/action";
import BorrowerPayModal from "./borrowerPayModal";

const { TabPane } = Tabs;

export default function DasboardBorower() {
  const dispatch = useDispatch()
  const [showModalPayVisible, setShowModalPayVisible] = useState(false)
  const {
    isLoanBorrowerLoading,
    isLoanBorrowerSuccess,
    isLoanBorrowerError,
    isBorrowerPayLoading,
    isBorrowerPaySuccess,
    isBorrowerPayError
  } = useSelector((state) => state.pinjamanku)

  useEffect(() => {
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
    if (!!isLoanBorrowerError) {
      message.error(isLoanBorrowerError?.message ?? "something went wrong on User");
    }
  }, [isLoanBorrowerError]);

  return (
    <div>
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
      <Tabs defaultActiveKey="1" style={{ paddingLeft: 50 }}>
        <TabPane tab="List Pinjaman" key="1" style={{ paddingRight: 50 }}>
          <section className="container">
            <div className="m-3">
              <h4>Pinjaman :</h4>
            </div>
            <List
              dataSource={isLoanBorrowerSuccess.filter(
                (item) => item?.status === "borrowed"
              )}
              loading={isLoanBorrowerLoading}
              renderItem={(item) => <ListItemStatusPinjam item={item} />}
            ></List>
            <List
              dataSource={isLoanBorrowerSuccess.filter(item => item?.status === 'deadline')}
              loading={isLoanBorrowerLoading}
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
              dataSource={isLoanBorrowerSuccess.filter(item => item?.status === 'completed')}
              loading={isLoanBorrowerLoading}
              renderItem={item => (
                <ListItemStatusPinjam item={item} />
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
