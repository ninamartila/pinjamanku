import React, { useEffect } from 'react'
import { Layout, List, message, Avatar } from 'antd'
import { AdminFooter, AdminNavbar } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoan } from '../../store/Pinjaman/action';

const { Content, Header } = Layout;

export default function ListLoan() {
    const dispatch = useDispatch()
    const {
        isLoanLoading,
        isLoanSuccess,
        isLoanError,
    } = useSelector((state) => state.pinjamanku)

    useEffect(() => {
        dispatch(fetchLoan())
    }, [])

    useEffect(() => {
        if (!!isLoanError) {
            message.error(isLoanError?.message ?? 'something went wrong');
        }
    }, [isLoanError])

    return (
        <Layout style={{ height: '100vh' }}>
            <AdminNavbar />
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '100%' }}>
                        <div className="demo-infinite-container">
                            <List
                                dataSource={isLoanSuccess}
                                loading={isLoanLoading}
                                renderItem={item => (
                                    <List.Item key={item?.id}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title={<p>{item?.Lender?.firstName} {item?.Lender?.firstName}</p>}
                                            description={<p>IDR {item?.initialLoan.toLocaleString("id-ID")}</p>}
                                        />
                                        <div>
                                            <p style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: '#0ba6ff', color: 'white', borderRadius: 10 }}>{item?.status}</p>
                                        </div>
                                    </List.Item>
                                )}
                            >
                            </List>
                        </div>
                    </div>
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    )
}