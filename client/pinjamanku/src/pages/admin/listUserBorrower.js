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
        history.push(`/borrowerDetail/${userId}`)
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <AdminNavbar />
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '100%' }}>
                        <div className="demo-infinite-container">
                            <List
                                dataSource={isUserSuccess?.borrower}
                                loading={isUserLoading}
                                renderItem={item => (
                                    <List.Item key={item?.id} onClick={() => onClick(item?.id)}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title={<a href="https://ant.design">{item?.firstName} {item?.lastName}</a>}
                                            description={item?.email}
                                        />
                                        {/* <div>Content</div> */}
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