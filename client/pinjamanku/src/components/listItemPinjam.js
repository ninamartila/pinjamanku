export default function ListItemPinjam(props) {
    const { item } = props
    return (
        <div className="row justify-content-center ">
            <div className="card col-md-8  m-3">
                <div className="card-body  m-3">
                    <div className="row justify-content-between">
                        <div className="col-md-2">
                            <h5>Lander :</h5>
                            <p>{item?.lenderID}</p>
                        </div>
                        <div className="col-md-2">
                            <h5>Total :</h5>
                            <p>Rp. {item?.initialLoan}</p>
                        </div>
                        <div className="col-md-2">
                            <h5>Bunga :</h5>
                            <p>8%</p>
                        </div>
                        <div className="col-md-2">
                            <h5>Jangka :</h5>
                            <p>{item?.tenor}-bulan</p>
                        </div>
                        <div className="col-md-2  justify-content-center text-center">
                            <button className="btn btn-primary">Pinjam</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}