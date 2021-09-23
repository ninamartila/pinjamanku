import { useDispatch } from "react-redux";
import {
  borrowerPay,
  landerGetAmount,
  landerInvest,
} from "../store/Pinjaman/action";
import {
  LoadingOutlined,
} from '@ant-design/icons';
import { Button } from "antd";

export default function LenderItemCard(props) {
  const dispatch = useDispatch();
  const { item, isLoading } = props;

  function withdrawLoan(data) {
    dispatch(landerGetAmount(data));
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
            <div className="col-md-4">
              <h5>Interest:</h5>
              <p>7%</p>
            </div>
            <div className="col-md-2">
              <h5>Tenor :</h5>
              <p>{item?.tenor} months</p>
            </div>
          </div>

          <div className="row justify-content-between">
            <div className="col-md-4">
              <h5>Profit :</h5>
              <p>IDR {(item?.initialLoan * 0.05).toLocaleString("id-ID")}</p>
            </div>
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
                <p style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: '#1589FF', color: 'white', borderRadius: 10 }}>Pending</p>
              ) : item?.status === "active" ? (
                <p style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: '#6CBB3C', color: 'white', borderRadius: 10 }}>Active</p>
              ) : item?.status === "borrowed" ? (
                <p style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: '#E9AB17', color: 'white', borderRadius: 10 }}>Borrowed</p>
              ) : item?.status === "complete" ? (
                <p style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: '#2E8B57', color: 'white', borderRadius: 10 }}>Completed</p>
              ) : item?.status === "deadline" ? (
                <p style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: '#C11B17', color: 'white', borderRadius: 10 }}>PAST DUE</p>
              ) : (
                <a style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: '#657383', color: 'white', borderRadius: 10 }}>Withdrawn</a>
              )}
            </div>
          </div>
        </div>
        {/* {item?.status === "pending" ? (
          <div className="row justify-content-between">
            <button
              className="btn btn-primary"
              onClick={() => payInvest({ loanID: item?.id })}
            >
              Pay Now
            </button>
          </div>
        ) : null} */}
        {item?.status === "complete" ? (
          <div className="row justify-content-between">
            <Button
              loading={isLoading}
              style={{ fontSize: 18 }}
              type="primary"
              onClick={() => withdrawLoan({ loanID: item?.id })}
            >
              Withdraw Now
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
