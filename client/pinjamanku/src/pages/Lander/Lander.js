import { message, Tabs } from "antd";
import { List, PageHeader, Tabs, Button, Statistic, Descriptions } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItemStatusPinjam, Navbar } from "../../components";
import { fetchLoan } from "../../store/Pinjaman/action";
import LenderAmountModal from "./LenderAmountModal";

const { TabPane } = Tabs;

export default function Lander() {
  const dispatch = useDispatch();
  const [showModalVisible, setShowModalVisible] = useState(false);
  const {
    isLoanLoading,
    isLoanSuccess,
    isLoanError,
    isLanderGetAmountLoading,
    isLanderGetAmountSuccess,
    isLanderGetAmountError,
  } = useSelector((state) => state.pinjamanku);

  useEffect(() => {
    if (isLanderGetAmountSuccess && showModalVisible === false) {
      setShowModalVisible(true);
    }
  }, [isLanderGetAmountSuccess]);

  useEffect(() => {
    if (!!isLanderGetAmountError) {
      message.error(isLanderGetAmountError?.message ?? "something went wrong");
    }
  }, [isLanderGetAmountError]);

  useEffect(() => {
    dispatch(fetchLoan());
  }, []);

  useEffect(() => {
    if (!!isLoanError) {
      message.error(isLoanError?.message ?? "something went wrong");
    }
  }, [isLoanError]);

  return (
    <div>
      <Navbar />
      <PageHeader
        className="site-page-header-responsive"
        title="Title"
        subTitle="This is a subtitle"
      >
        <Content extra={extraContent}>{renderContent()}</Content>
      </PageHeader>
      <Tabs defaultActiveKey="1" style={{ paddingLeft: 10 }}>
        <TabPane tab="List Peminjaman Pending" key="1">
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
        <TabPane tab="List Pinjaman Active" key="2">
          <section className="container">
            <div className="m-3">
              <h4>Pinjaman Active :</h4>
            </div>
            <List
              dataSource={isLoanSuccess.filter(
                (item) => item?.status === "active"
              )}
              loading={isLoanLoading}
              renderItem={(item) => <ListItemStatusPinjam item={item} />}
            ></List>
          </section>
        </TabPane>
        <TabPane tab="List Pinjaman Completed" key="3">
          <section className="container">
            <div className="m-3">
              <h4>Pinjaman Selesai :</h4>
            </div>
            <List
              dataSource={isLoanSuccess.filter(
                (item) => item?.status === "completed"
              )}
              loading={isLoanLoading}
              renderItem={(item) => <ListItemStatusPinjam item={item} />}
            ></List>
          </section>
        </TabPane>
      </Tabs>
      <LenderAmountModal
        isModalVisible={showModalVisible}
        data={isLanderGetAmountSuccess}
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
