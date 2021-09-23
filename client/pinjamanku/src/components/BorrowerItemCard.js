import { Button } from "antd";
import { useDispatch } from "react-redux";
import { borrowerPay, landerGetAmount } from "../store/Pinjaman/action";

export default function BorrowerItemCard(props) {
  const dispatch = useDispatch();
  const { item, isLoading } = props;

  function onCompleted(data) {
    dispatch(landerGetAmount(data));
  }

  function payLoan(data) {
    dispatch(borrowerPay(data));
  }

  return (
    <div className="row justify-content-center">
      <div className="card col-md-12  m-3">
        <div className="card-body  m-3">
          <div className="row justify-content-between">
            <div className="col-md-4">
              <h5>Loan Amount:</h5>
              <p>IDR {item?.initialLoan.toLocaleString("id-ID")}</p>
            </div>
            <div className="col-md-4">
              <h5>Interest:</h5>
              <p>7%</p>
            </div>
            <div className="col-md-2">
              <h5>Repayment Amount:</h5>
              <p>IDR {(item?.initialLoan + (item?.initialLoan * 0.07)).toLocaleString("id-ID")}</p>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-md-4">
              <h5>Deadline:</h5>
              <p>in {item?.timeRemaining} days</p>
            </div>
            <div className="col-md-4">
              <h5>Tenor:</h5>
              <p>{item?.tenor} months</p>
            </div>
            <div className="col-md-2">
              <h5>Status :</h5>
              {item.status === "pending" ? (
                <p style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: '#1589FF', color: 'white', borderRadius: 10 }}>Pending</p>
              ) : item?.status === "active" ? (
                <p style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: '#6CBB3C', color: 'white', borderRadius: 10 }}>Active</p>
              ) : item?.status === "borrowed" ? (
                <p style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: '#E9AB17', color: 'white', borderRadius: 10 }}>Borrowed</p>
              ) : item?.status === "complete" || item?.status === "withdrawn" ? (
                <p style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: '#2E8B57', color: 'white', borderRadius: 10 }}>Paid</p>
              ) : (
                <p style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: '#C11B17', color: 'white', borderRadius: 10 }}>PAST DUE</p>
              )}
            </div>
          </div>
        </div>
        {
          item?.status === "borrowed" || item?.status === "deadline" ?
            (<div className="row justify-content-between">
              <Button loading={isLoading} style={{ fontSize: 18 }} type="primary" onClick={() => payLoan({ loanID: item?.id })}>Pay Now</Button>
            </div>) : null
        }
      </div>
    </div>
  );
}
