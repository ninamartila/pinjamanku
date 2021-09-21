import { message } from "antd";
import { List } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItemPinjam, Navbar } from "../../components";
import { fetchLoan } from "../../store/Pinjaman/action";
import BorrowerLoanModal from "./borrowerLoanModal";

export default function TempatMinjam() {
  const dispatch = useDispatch()
  const [showModalVisible, setShowModalVisible] = useState(false)
  const {
    isLoanLoading,
    isLoanSuccess,
    isLoanError,
    isBorrowerAmountLoading,
    isBorrowerAmountSuccess,
    isBorrowerAmountError,
  } = useSelector((state) => state.pinjamanku)

  useEffect(() => {
    if (isBorrowerAmountSuccess && showModalVisible === false) {
      setShowModalVisible(true)
    }
  }, [isBorrowerAmountSuccess])

  useEffect(() => {
    if (!!isBorrowerAmountError) {
      message.error(isBorrowerAmountError?.message ?? 'something went wrong');
    }
  }, [isBorrowerAmountError])

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
        {/* list semua loan yang ingin dipinjamkan dengan status Panding */}
        <div className="m-5 text-center">
          <h1>Silahkan Pilih Sesuka hati anda</h1>
        </div>
        <List
          dataSource={isLoanSuccess.filter(item => item?.status === 'active')}
          loading={isLoanLoading}
          renderItem={item => (
            <ListItemPinjam item={item} />
          )}
        >
        </List>
      </section>
      <BorrowerLoanModal isModalVisible={showModalVisible} data={isBorrowerAmountSuccess} handleCancel={() => {
        setShowModalVisible(false)
      }} handleOk={() => {
        setShowModalVisible(false)
      }} />
    </div>
  );
}
