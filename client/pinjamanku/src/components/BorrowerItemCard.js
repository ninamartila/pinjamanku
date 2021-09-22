import { useDispatch } from "react-redux";
import { borrowerPay, landerGetAmount } from "../store/Pinjaman/action";

export default function BorrowerItemCard(props) {
  const dispatch = useDispatch();
  const { item } = props;

  function onCompleted(data) {
    dispatch(landerGetAmount(data));
  }

  function onActive(data) {
    dispatch(borrowerPay(data));
  }

  return (
    <div className="row justify-content-center">
      <div className="card col-md-12  m-3">
        <div className="card-body  m-3">
          <div className="row justify-content-between">
            <div className="col-md-4">
              <h5>Loan Amount:</h5>
              <p>IDR {item?.initialLoan}</p>
            </div>
            <div className="col-md-2">
              <h5>Interest:</h5>
              <p>7%</p>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-md-4">
              <h5>Repayment Amount:</h5>
              <p>IDR {item?.initialLoan + (item?.initialLoan * 0.07)}</p>
            </div>

            <div className="col-md-2">
              <h5>Deadline:</h5>
              <p>in {item?.timeRemaining} days</p>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-md-4">
              <h5>Tenor:</h5>
              <p>{item?.tenor} months</p>
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
                  onClick={() => onActive({ loanID: item?.id })}
                >
                  Borrowed
                </button>
              ) : item?.status === "complete" || item?.status === "withdrawn" ? (
                <button
                  className="btn btn-success"
                >
                  Paid
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
          item?.status === "borrowed" && item?.Borrower?.role === 'borrower' ?
            (<div className="row justify-content-between">
              <button className="btn btn-primary" onClick={() => onActive({ loanID: item?.id })}>Pay Now</button>
            </div>) : null
        }
      </div>
    </div>
  );
}
