import { useDispatch } from "react-redux"
import { borrowerPay, landerGetAmount } from "../store/Pinjaman/action"

export default function ListItemStatusPinjam(props) {
    const dispatch = useDispatch()
    const { item } = props

    function onCompleted(data) {
        dispatch(landerGetAmount(data))
    }

    return (
        <div className="row justify-content-center">
            <div className="card col-md-12  m-3">
                <div className="card-body  m-3">
                    <div className="row justify-content-between">
                        <div className="col-md-4">
                            <h5>Total :</h5>
                            <p>IDR {item?.initialLoan?.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="col-md-4">
                            <h5>Cicilan Selama :</h5>
                            <p>{item?.tenor}-hari</p>
                        </div>
                        <div className="col-md-2">
                            <h5>Waktu tersisa :</h5>
                            <p>{item?.timeRemaining} Hari</p>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-md-2">
                            <h5>Bunga :</h5>
                            <p>7%</p>
                        </div>
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
                                            <a className="btn btn-success" >Borrower</a>
                                            : item?.status === 'completed' ?
                                                <a className="btn btn-success">Completed</a>
                                                : <a className="btn btn-danger">Withdraw</a>
                            }
                        </div>
                        {
                            item?.status === 'withdrawn' && item?.Lender?.role === 'lender' ?
                                (<div className="row justify-content-between" style={{ marginTop: 20 }}>
                                    <button className="btn btn-primary" onClick={() => onCompleted({ loanID: item?.id, lenderID: item?.lenderID })}>Withdraw Now</button>
                                </div>) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
} 