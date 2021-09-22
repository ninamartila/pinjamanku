import React, { useEffect } from 'react'
import { Layout, List, message, Avatar } from 'antd'
import { AdminFooter, AdminNavbar } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoanBorrower, fetchLoanLender } from '../../store/Pinjaman/action';

const { Content, Header } = Layout;

export default function ListLoan() {
    const dispatch = useDispatch()
    const {
        isLoanBorrowerLoading,
        isLoanBorrowerSuccess,
        isLoanBorrowerError,
        isLoanLenderLoading,
        isLoanLenderSuccess,
        isLoanLenderError,
    } = useSelector((state) => state.pinjamanku)

    useEffect(() => {
        dispatch(fetchLoanLender())
        dispatch(fetchLoanBorrower())
    }, [])

    useEffect(() => {
        if (!!isLoanBorrowerError) {
            message.error(isLoanBorrowerError?.message ?? 'something went wrong');
        }
    }, [isLoanBorrowerError])

    useEffect(() => {
        if (!!isLoanLenderError) {
            message.error(isLoanLenderError?.message ?? 'something went wrong');
        }
    }, [isLoanLenderError])

    console.log(isLoanLenderSuccess, '=========');
    return (
        <Layout style={{ height: '100vh' }}>
            <AdminNavbar />
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '100%' }}>
                        <div className="demo-infinite-container">
                            {
                                isLoanBorrowerSuccess?.length > 0 ?
                                    (<List
                                        dataSource={isLoanBorrowerSuccess}
                                        loading={isLoanBorrowerLoading}
                                        renderItem={item => (
                                            <List.Item key={item?.id}>
                                                <List.Item.Meta
                                                    avatar={
                                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                    }
                                                    title={<p>{item?.Borrower?.firstName} {item?.Borrower?.firstName}</p>}
                                                    description={item?.initialLoan}
                                                />
                                                <div>{item?.status}</div>
                                            </List.Item>
                                        )}
                                    >
                                    </List>) : null
                            }
                            <List
                                dataSource={isLoanLenderSuccess}
                                loading={isLoanLenderLoading}
                                renderItem={item => (
                                    <List.Item key={item?.id}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title={<p>{item?.Lender?.firstName} {item?.Lender?.firstName}</p>}
                                            description={<p>Rp. {item?.initialLoan}</p>}
                                        />
                                        <div>{item?.status}</div>
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