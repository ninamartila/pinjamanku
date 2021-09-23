import { useDispatch } from "react-redux";
import { borrowerAmount } from "../store/Pinjaman/action";
import { useHistory } from "react-router-dom";
import {
    LoadingOutlined,
} from '@ant-design/icons';


export default function ListItemPinjam(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { item, isLoading } = props;

    function onClick(loanId) {
        if (localStorage.getItem("access_token")) {
            dispatch(borrowerAmount(loanId));
        } else {
            history.push("/login");
        }
    }
    return (
        <div className="row justify-content-center ">
            <div className="card col-md-8  m-3">
                <div className="card-body  m-3">
                    <div className="row justify-content-between">
                        <div className="col-md-2">
                            <h5>Lender:</h5>
                            <p>{item?.Lender.firstName}</p>
                        </div>
                        <div className="col-md-2">
                            <h5>Amount :</h5>
                            <p>IDR {item?.initialLoan.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="col-md-2">
                            <h5>Interest :</h5>
                            <p>7%</p>
                        </div>
                        <div className="col-md-2">
                            <h5>Tenor :</h5>
                            <p>{Math.floor(item?.tenor / 30)} months</p>
                        </div>
                        {localStorage.getItem("role") === "lender" ? (
                            ""
                        ) : (
                            <div className="col-md-2 justify-content-center text-center">
                                <button
                                    className="btn-login"
                                    onClick={() => onClick(item?.id)}
                                    style={{ width: '100px' }}
                                >
                                    {
                                        isLoading && <LoadingOutlined color="white" />
                                    }
                                    Pinjam
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
