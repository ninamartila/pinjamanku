import React, { useEffect } from 'react'
import { Layout, List, message, Avatar, Button } from 'antd'
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

    function onClick(userId) {
        dispatch(fetchUserUpdate(userId, 'Verified'))
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
                <Content style={{ marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '100%' }}>
                        <div className="demo-infinite-container">
                            <List
                                dataSource={isUserSuccess?.borrower?.filter(item => item?.status === 'Verified')}
                                loading={isUserLoading}
                                renderItem={item => (
                                    <List.Item key={item.id} onClick={() => onClick(item?.id)}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title={<a href="https://ant.design">{item?.firstName} {item?.lastName}</a>}
                                            description={item?.email}
                                        />
                                        <Button
                                            type="primary"
                                        >
                                            Verified
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