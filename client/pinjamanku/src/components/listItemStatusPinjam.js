import { useDispatch } from "react-redux"
import { borrowerPay, landerGetAmount } from "../store/Pinjaman/action"

export default function ListItemStatusPinjam(props) {
    const dispatch = useDispatch()
    const { item } = props

    function onCompleted(data) {
        dispatch(landerGetAmount(data))
    }

    function onActive(data) {
        dispatch(borrowerPay(data))
    }

    return (
        <div className="row justify-content-center">
            <div className="card col-md-12  m-3">
                <div className="card-body  m-3">
                    <div className="row justify-content-between">
                        <div className="col-md-4">
                            <h5>Total :</h5>
                            <p>Rp. {item?.initialLoan}</p>
                        </div>
                        <div className="col-md-2">
                            <h5>Bunga :</h5>
                            <p>7%</p>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-md-4">
                            <h5>Cicilan Selama :</h5>
                            <p>{item?.tenor}-bulan</p>
                        </div>

                        <div className="col-md-2">
                            <h5>Waktu tersisa :</h5>
                            <p>30 Hari</p>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-md-4">
                            <h5>Peminjam :</h5>
                            {/* bergantung status */}
                            <p>madun@gmail.com</p>
                        </div>
                        <div className="col-md-2">
                            <h5>Status :</h5>
                            {
                                item.status === 'pending' ? <a className="btn btn-warning" >Pending</a>
                                    : item?.status === 'active' ?
                                        <a className="btn btn-success">Active</a>
                                        : item?.status === 'borrowed' ?
                                            <button className="btn btn-success" onClick={() => onActive({ loanID: item?.id })}>Borrower</button>
                                            : item?.status === 'completed' ?
                                                <button className="btn btn-success" onClick={() => onCompleted({ loanID: item?.id, lenderID: item?.lenderID })}>Completed</button>
                                                : <a className="btn btn-danger">Withdrawn</a>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 