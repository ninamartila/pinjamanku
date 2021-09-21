import { message } from "antd";
import { List } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItemStatusPinjam, Navbar } from "../../components";
import { fetchLoan } from "../../store/Pinjaman/action";

export default function Lander() {
  const dispatch = useDispatch()
  const { isLoanLoading, isLoanSuccess, isLoanError } = useSelector((state) => state.pinjamanku)

  useEffect(() => {
    dispatch(fetchLoan())
  }, [])

  useEffect(() => {
    if (!!isLoanError) {
      message.error(isLoanError?.message ?? 'something went wrong');
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
      <section className="container">
        {/* listLoan yang idnya sama yang dipunya/ login sekarang */}
        <div className="m-5">
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
        <div className="m-5">
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
        <div className="m-5">
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
      </section>
    </div>
  );
}
