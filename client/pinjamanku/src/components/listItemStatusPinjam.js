export default function ListItemStatusPinjam(props) {
    const { type } = props

    if (type === 'active') {
        return (
            <div className="row justify-content-center">
                <div className="card col-md-12  m-3">
                    <div className="card-body  m-3">
                        <div className="row justify-content-between">
                            <div className="col-md-4">
                                <h5>Total :</h5>
                                <p>Rp. 1.200.000</p>
                            </div>
                            <div className="col-md-4">
                                <h5>Angsuran Bulan ini :</h5>
                                <p>Rp. 200.000</p>
                            </div>
                            <div className="col-md-2">
                                <h5>Bunga :</h5>
                                <p>8%</p>
                            </div>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col-md-4">
                                <h5>Cicilan Selama :</h5>
                                <p>6-bulan</p>
                            </div>
                            <div className="col-md-4">
                                <h5>Sisa Cicilan :</h5>
                                <p>3x</p>
                            </div>
                            <div className="col-md-2">
                                <h5>Deadline :</h5>
                                <p>21-09-2021</p>
                            </div>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col-md-4">
                                <h5>Peminjam :</h5>
                                <p>madun@gmail.com</p>
                            </div>
                            <div className="col-md-4">
                                <h5>Terkumpul:</h5>
                                <p>Rp. 200.000</p>
                            </div>
                            <div className="col-md-2">
                                <h5>Status :</h5>
                                <button className="btn btn-danger">Belum Bayar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card col-md-12  m-3">
                    <div className="card-body  m-3">
                        <div className="row justify-content-between">
                            <div className="col-md-4">
                                <h5>Total :</h5>
                                <p>Rp. 1.200.000</p>
                            </div>
                            <div className="col-md-4">
                                <h5>Angsuran Bulan ini :</h5>
                                <p>Rp. 200.000</p>
                            </div>
                            <div className="col-md-2">
                                <h5>Bunga :</h5>
                                <p>8%</p>
                            </div>
                        </div>

                        <div className="row justify-content-between">
                            <div className="col-md-4">
                                <h5>Cicilan Selama :</h5>
                                <p>6-bulan</p>
                            </div>
                            <div className="col-md-4">
                                <h5>Sisa Cicilan :</h5>
                                <p>3x</p>
                            </div>
                            <div className="col-md-2">
                                <h5>Deadline :</h5>
                                <p>21-09-2021</p>
                            </div>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col-md-4">
                                <h5>Peminjam :</h5>
                                <p>madun@gmail.com</p>
                            </div>
                            <div className="col-md-4">
                                <h5>Terkumpul:</h5>
                                <p>Rp. 200.000</p>
                            </div>
                            <div className="col-md-2">
                                <h5>Status :</h5>
                                <button className="btn btn-success">Sudah Bayar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row justify-content-center">
                <div className="card col-md-12  m-3">
                    <div className="card-body  m-3">
                        <div className="row justify-content-between">
                            <div className="col-md-4">
                                <h5>Total :</h5>
                                <p>Rp. 1.200.000</p>
                            </div>
                            <div className="col-md-4">
                                <h5>Angsuran Bulan ini :</h5>
                                <p>Rp. 200.000</p>
                            </div>
                            <div className="col-md-2">
                                <h5>Bunga :</h5>
                                <p>8%</p>
                            </div>
                        </div>

                        <div className="row justify-content-between">
                            <div className="col-md-4">
                                <h5>Cicilan Selama :</h5>
                                <p>6-bulan</p>
                            </div>
                            <div className="col-md-4">
                                <h5>Sisa Cicilan :</h5>
                                <p>3x</p>
                            </div>
                            <div className="col-md-2">
                                <h5>Deadline :</h5>
                                <p>21-09-2021</p>
                            </div>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col-md-4">
                                <h5>Peminjam :</h5>
                                <p>madun@gmail.com</p>
                            </div>
                            <div className="col-md-4">
                                <h5>Terkumpul:</h5>
                                <p>Rp. 200.000</p>
                            </div>
                            <div className="col-md-2">
                                <h5>Status :</h5>
                                <button className="btn btn-warning">Lunas</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}