import React, { useEffect } from 'react'
import { Layout, List, message, Avatar } from 'antd'
import { AdminFooter, AdminNavbar } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/user/action';
import { useHistory } from 'react-router-dom';

const { Content, Header } = Layout;

export default function ListUserBorrower() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { isUserLoading, isUserSuccess, isUserError } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    useEffect(() => {
        if (!!isUserError) {
            message.error(isUserError?.message ?? 'something went wrong');
        }
    }, [isUserError])

    function onClick(userId) {
        history.push(`/admin-dashboard/borrowerDetail/${userId}`, {
            type: 'borrower'
        })
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <AdminNavbar />
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, overflowY: "scroll", height: '100%' }}>
                        <div className="demo-infinite-container">
                            <List
                                dataSource={isUserSuccess?.borrower}
                                loading={isUserLoading}
                                renderItem={item => (
                                    <List.Item key={item?.id} onClick={() => onClick(item?.id)} style={{ backgroundColor: 'white', borderRadius: '5px', cursor: 'pointer', marginBottom: '8px', padding: '16px' }}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title={<p>Name : {item?.firstName} {item?.lastName}</p>}
                                            description={<p>Email : {item?.email}</p>}
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <h6>Status: </h6>
                                            <p style={{ padding: 10, backgroundColor: item?.status === 'Pending' ? 'yellow' : '#0ba6ff', color: 'black', borderRadius: 10 }}>{item?.status}</p>
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