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
                <Content style={{ marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '100%' }}>
                        <div className="demo-infinite-container">
                            <div>
                                <p>{isUserByIdSucces?.toString()}</p>
                            </div>
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
                                <Button
                                    type="primary"
                                >
                                    Reload
                                </Button>
                            </Space>
                        </div>
                    </div>
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    )
}