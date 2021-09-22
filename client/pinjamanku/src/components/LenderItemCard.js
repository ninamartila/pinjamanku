import { useDispatch } from "react-redux"
import { borrowerPay, landerGetAmount, landerInvest } from "../store/Pinjaman/action"

export default function LenderItemCard(props) {
    const dispatch = useDispatch()
    const { item } = props

    function onCompleted(data) {
        dispatch(landerGetAmount(data))
    }

    function payInvest(data) {
      dispatch(landerInvest(data));
    }

    return (
<div className="row justify-content-center">
      <div className="card col-md-12  m-3">
        <div className="card-body  m-3">
          <div className="row justify-content-between">
            <div className="col-md-4">
              <h5>Amount:</h5>
              <p>IDR {item?.initialLoan.toLocaleString("id-ID")}</p>
            </div>
            <div className="col-md-2">
              <h5>Interest:</h5>
              <p>7%</p>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-md-4">
              <h5>Tenor :</h5>
              <p>{item?.tenor} months</p>
            </div>

            <div className="col-md-2">
              <h5>Profit :</h5>
              <p>IDR {(item?.initialLoan * 0.05).toLocaleString("id-ID")}</p>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-md-4">
              <h5>Borrower :</h5>
              {/* bergantung status */}
              {item?.Borrower === null ? (
                <p>Not borrowed yet</p>
              ) : (
                <p>{item.Borrower.firstName}</p>
              )}
            </div>
            <div className="col-md-2">
              <h5>Status :</h5>
              {item.status === "pending" ? (
                <a className="btn btn-info">Pending</a>
              ) : item?.status === "active" ? (
                <a className="btn btn-success">Active</a>
              ) : item?.status === "borrowed" ? (
                <button
                  className="btn btn-warning"
                >
                  Borrowed
                </button>
              ) : item?.status === "complete" ? (
                <button
                  className="btn btn-success"
                  onClick={() =>
                    onCompleted({ loanID: item?.id, lenderID: item?.lenderID })
                  }
                >
                  Completed
                </button>
              ) : item?.status === "deadline" ? (
                <a className="btn btn-danger">PAST DUE</a>
              ) : (
                <a className="btn btn-primary">Withdrawn</a>
              )}
            </div>
          </div>
        </div>
        {
          item?.status === "pending" ?
            (<div className="row justify-content-between">
              <button className="btn btn-primary" onClick={() => payInvest({ loanID: item?.id })}>Pay Now</button>
            </div>) : null
        }
      </div>
    </div>
    )
} 