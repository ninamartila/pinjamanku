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

    console.log(isLoanSuccess);
    return (
        <Layout style={{ height: '100vh' }}>
            <AdminNavbar />
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, overflowY: "scroll", height: '100%' }}>
                        <List
                            dataSource={isLoanSuccess}
                            loading={isLoanLoading}
                            renderItem={item => (
                                <List.Item key={item?.id} style={{ backgroundColor: 'white', borderRadius: '5px', cursor: 'pointer', marginBottom: '8px', padding: '16px' }}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={<p>Name : {item?.Lender?.firstName} {item?.Lender?.firstName}</p>}
                                        description={
                                            <div>
                                                <p>Loan : IDR {item?.initialLoan.toLocaleString("id-ID")}</p>
                                                <p>External Id : {item?.externalID}</p>
                                            </div>
                                        }
                                    />
                                    <div>
                                        <p style={{ padding: 10, width: 100, textAlign: 'center', backgroundColor: item?.status === 'pending' ? 'yellow' : item?.status === 'deadline' ? 'Red' : item?.status === 'borrowed' ? '#0033ff' : 'Green', color: 'black', borderRadius: 10 }}>{item?.status}</p>
                                    </div>
                                </List.Item>
                            )}
                        >
                        </List>
                    </div>
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    )
}