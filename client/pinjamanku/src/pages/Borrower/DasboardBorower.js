import { message, Tabs, List, Empty } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ListItemStatusPinjam,
  Navbar,
  BorrowerItemCard,
} from "../../components";
import { fetchLoan, fetchLoanBorrower } from "../../store/Pinjaman/action";

import { fetchUserById } from "../../store/user/action";

import BorrowerPayModal from "./borrowerPayModal";

const { TabPane } = Tabs;

export default function DasboardBorower() {
  const dispatch = useDispatch();
  const [showModalPayVisible, setShowModalPayVisible] = useState(false);
  const {
    isLoanLoading,
    isLoanSuccess,
    isLoanError,
    isBorrowerLoanLoading,
    isBorrowerLoanSuccess,
    isBorrowerLoanError,
    isBorrowerPayLoading,
    isBorrowerPaySuccess,
    isBorrowerPayError,
  } = useSelector((state) => state.pinjamanku);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bank, setBank] = useState("");
  const [code, setCode] = useState("");
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
    dispatch(fetchLoanBorrower());

    dispatch(
      fetchUserById(localStorage.getItem("id"), localStorage.getItem("role"))
    ).then((data) => {
      setEmail(data.email);
      setBank(data.accountNumber);
      setCode(data.bankCode);
      setFirstName(data.firstName);
      setLastName(data.lastName);
    });
  }, []);

  useEffect(() => {
    if (!!isBorrowerLoanError) {
      message.error(isBorrowerLoanError?.message ?? "something went wrong");
    }
  }, [isBorrowerLoanError]);

  console.log(isBorrowerLoanSuccess, isBorrowerPayLoading);
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card col-md-12  m-3">
          <div className="card-body  m-3">
            <div className="row d-flex flex-row">
              <h2>
                Hi, {firstName} {lastName}!
              </h2>
            </div>
            <div className="row justify-content-between">
              <div className="col-md-4">
                <h5>
                  Acc. Number : {bank} ({code})
                </h5>
              </div>

              <div className="col-md-4 d-flex flex-col">
                <h5>Email : </h5>
                <p> {email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Tabs defaultActiveKey="1" style={{ paddingLeft: 10 }} renderTabBar={(props, DefaultTabBar) => <DefaultTabBar {...props} className="ant-tabs-tab" />}>
          <TabPane tab="Current Loan" key="2">
            <section className="container">
              <div className="m-3">
                <h4>Currently borrowed:</h4>
                <p style={{ fontSize: 16 }}>list of your active loans</p>
              </div>
              <List
                dataSource={isBorrowerLoanSuccess.filter(item => item?.status === 'borrowed')}
                loading={isBorrowerLoanLoading}
                locale={{
                  emptyText: <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 200,
                    }} />
                }}
                renderItem={item => (
                  <BorrowerItemCard item={item} isLoading={isBorrowerPayLoading?.loanID === item.id} />
                )}
              >
              </List>
            </section>
          </TabPane>
          <TabPane tab="Completed Loan" key="3">
            <section className="container">
              <div className="m-3">
                <h4>Completed :</h4>
                <p style={{ fontSize: 16 }}>list of your past loans</p>
              </div>
              <List
                dataSource={isBorrowerLoanSuccess.filter(item => item?.status === 'complete' || item?.status === 'withdrawn')}
                loading={isBorrowerLoanLoading}
                locale={{
                  emptyText: <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 200,
                    }} />
                }}
                renderItem={item => (
                  <BorrowerItemCard item={item} />
                )}
              >
              </List>
            </section>
          </TabPane>
        </Tabs >
      </div>
      <BorrowerPayModal isModalVisible={showModalPayVisible} invoiceURL={isBorrowerPaySuccess?.invoiceURL} handleCancel={() => {
        setShowModalPayVisible(false)
      }} handleOk={() => {
        dispatch(fetchLoanBorrower())
        setShowModalPayVisible(false)
      }} />
    </div >
  );
}
