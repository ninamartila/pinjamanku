import { Button, Image, message, Space } from "antd"
import { Layout } from "antd"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation, useParams } from "react-router-dom"
import { AdminFooter, AdminNavbar } from "../../components"
import { fetchUserById } from "../../store/user/action"

const { Content, Header } = Layout;

export default function DetailBorrower() {
    const { userId } = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const type = location?.state?.type
    const { isUserByIdLoading, isUserByIdSucces, isUserByIdError } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(fetchUserById(userId, type))
    }, [])

    // useEffect(() => {
    //     if (!!isUserByIdError) {
    //         message.error(isUserByIdError?.message ?? 'something went wrong');
    //     }
    // }, [isUserByIdError])

    return (
        <Layout style={{ height: '100vh' }}>
            <AdminNavbar />
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content >
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '100%' }}>
                        <div className="demo-infinite-container">
                            <Space size={12}>
                                <Image
                                    width={200}
                                    src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                                    placeholder={
                                        <Image
                                            preview={false}
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                                            width={200}
                                        />
                                    }
                                />
                                <div style={{ display: "flex", flexDirection: 'row' }}>
                                    <div style={{ paddingLeft: 20 }}>
                                        <p>Account Number</p>
                                        <p>Name</p>
                                        <p>Holder Name</p>
                                        <p>Address</p>
                                        <p>Bank Code</p>
                                        <p>Birth Date</p>
                                        <p>Email</p>
                                        <p>status</p>
                                        <p>KTP Card</p>
                                        <p>Occupation</p>
                                        <p>Phone Number</p>
                                        <p>role</p>
                                    </div>
                                    <div style={{ paddingLeft: 20 }}>
                                        <p>: {isUserByIdSucces?.accountNumber}</p>
                                        <p>: {isUserByIdSucces?.firstName} {isUserByIdSucces?.lastName}</p>
                                        <p>: {isUserByIdSucces?.holderName}</p>
                                        <p>: {isUserByIdSucces?.address}</p>
                                        <p>: {isUserByIdSucces?.bankCode}</p>
                                        <p>: {isUserByIdSucces?.birthDate}</p>
                                        <p>: {isUserByIdSucces?.email}</p>
                                        <p>: {isUserByIdSucces?.status}</p>
                                        <p>: {isUserByIdSucces?.firstName}</p>
                                        <p>: {isUserByIdSucces?.ktpCard}</p>
                                        <p>: {isUserByIdSucces?.occupation}</p>
                                        <p>: {isUserByIdSucces?.phoneNumber}</p>
                                        <p>: {isUserByIdSucces?.role}</p>
                                    </div>
                                </div>
                            </Space>
                        </div>
                    </div>
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    )
}