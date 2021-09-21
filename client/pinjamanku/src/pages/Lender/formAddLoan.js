import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from 'antd'
import { useState } from "react";
import { Navbar } from "../../components";
import { landerInvest } from "../../store/Pinjaman/action";
import PaymentModal from "./paymentModal";

export default function AddLoan() {
    const dispatch = useDispatch()
    const { isLanderInvestLoading, isLanderInvestSuccess, isLanderInvestError } = useSelector((state) => state.pinjamanku)
    const [amount, setAmount] = useState(null)
    const [tenor, setTenor] = useState(null)
    const [showModalVisible, setShowModalVisible] = useState(false)

    useEffect(() => {
        if (typeof isLanderInvestSuccess?.invoiceURL === 'string') {
            setAmount('')
            setTenor('')
            message.success('Success Add Loan')
            setShowModalVisible(true)
        }
    }, [isLanderInvestSuccess])

    useEffect(() => {
        if (!!isLanderInvestError) {
            message.error(isLanderInvestError?.message ?? 'something went wrong');
        }
    }, [isLanderInvestError])

    const onAddLoan = () => {
        dispatch(landerInvest({ amount, tenor }))
    }

    return (
        <div>
            <Navbar />
            <section className="register d-flex flex-column justify-content-center">
                <div className="container">
                    <div className="row justify-content-end ">
                        <div className="col-md-6 m-3 card register-card">
                            <div className="p-5">
                                <h1>PinjamanKu</h1>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">
                                        Dana yang akan anda pinjamkan
                                    </label>
                                    <input
                                        type="numeric"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        onChange={(e) => {
                                            setAmount(e.target.value)
                                        }}
                                        value={amount}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">
                                        Jangka waktu
                                    </label>
                                    <input
                                        type="numeric"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        onChange={(e) => {
                                            setTenor(e.target.value)
                                        }}
                                        value={tenor}
                                    />
                                </div>
                                <button className="btn btn-primary" onClick={() => onAddLoan()}>
                                    Submit Loan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <PaymentModal isModalVisible={showModalVisible} invoiceURL={isLanderInvestSuccess?.invoiceURL} handleCancel={() => {
                setShowModalVisible(false)
            }} handleOk={() => {
                setShowModalVisible(false)
            }} />
        </div>
    );
}
