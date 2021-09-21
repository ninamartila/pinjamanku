import { message, Tabs, List } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItemStatusPinjam, Navbar } from "../../components";
import { fetchLoan } from "../../store/Pinjaman/action";

const { TabPane } = Tabs;

export default function DasboardBorower() {
  const dispatch = useDispatch();
  const { isLoanLoading, isLoanSuccess, isLoanError } = useSelector(
    (state) => state.pinjamanku
  );

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
    </div>
  );
}
