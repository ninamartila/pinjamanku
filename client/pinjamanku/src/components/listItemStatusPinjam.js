export default function ListItemStatusPinjam(props) {
    const { item } = props
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
                            <p>8%</p>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-md-4">
                            <h5>Cicilan Selama :</h5>
                            <p>{item?.tenor}-bulan</p>
                        </div>

                        <div className="col-md-2">
                            <h5>Deadline :</h5>
                            <p>21-09-2021</p>
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
                                item.status === 'pending' ? <button className="btn btn-warning">Pending</button>
                                    : item?.status === 'active' ?
                                        <button className="btn btn-success">Active</button>
                                        : <button className="btn btn-danger">Completed</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 