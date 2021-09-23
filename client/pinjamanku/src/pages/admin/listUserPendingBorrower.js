import React, { useEffect } from 'react'
import { Layout, List, message, Avatar, Button, Empty } from 'antd'
import { AdminFooter, AdminNavbar } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, fetchUserUpdate } from '../../store/user/action';

const { Content, Header } = Layout;

export default function ListUserPendingBorrower() {
    const dispatch = useDispatch()
    const { isUserLoading, isUserSuccess, isUserError, isUserUpdateLoading, isUserUpdateSuccess, isUserUpdateError } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    useEffect(() => {
        if (!!isUserError) {
            message.error(isUserError?.message ?? 'something went wrong on User List');
        }
    }, [isUserError])

    useEffect(() => {
        if (!!isUserUpdateError) {
            message.error(isUserUpdateError?.message ?? 'something went wrong on Update Status');
        }
    }, [isUserUpdateError])

    function onClick(userId, data) {
        dispatch(fetchUserUpdate(userId, data))
    }

    useEffect(() => {
        console.log({ isUserUpdateSuccess })
        if (isUserUpdateSuccess) {
            window.location.reload()
        }
    }, [isUserUpdateSuccess])

    return (
        <Layout style={{ height: '100vh' }}>
            <AdminNavbar />
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content >
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, overflowY: "scroll", height: '100%' }}>
                        <div className="demo-infinite-container">
                            <List
                                dataSource={isUserSuccess?.borrower?.filter(item => item?.status === 'Pending')}
                                loading={isUserLoading}
                                locale={{
                                    emptyText: <Empty
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{
                                            height: 200,
                                        }} />
                                }}
                                renderItem={item => (
                                    <List.Item key={item.id} style={{ backgroundColor: 'white', borderRadius: '5px', cursor: 'pointer', marginBottom: '8px', padding: '16px' }}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ width: 50, height: 50, marginTop: 10 }} />
                                            }
                                            title={<p style={{ fontSize: 18 }}>Name : {item?.firstName} {item?.lastName}</p>}
                                            description={<p style={{ fontSize: 18 }}>Email : {item?.email}</p>}
                                        />
                                        <Button
                                            type="primary"
                                            style={{ marginRight: 20 }}
                                            onClick={() => onClick(item?.id, 'Verified')}
                                        >
                                            Verified
                                        </Button>
                                        <Button
                                            type="danger"
                                            onClick={() => onClick(item?.id, 'Rejected')}
                                        >
                                            Reject
                                        </Button>
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