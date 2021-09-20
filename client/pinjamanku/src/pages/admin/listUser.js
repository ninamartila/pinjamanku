import React, { useState, useEffect } from 'react'
import { Layout, List, message, Avatar, Spin } from 'antd'
import { AdminFooter, AdminNavbar } from '../../components'
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
import { useSelector } from 'react-redux';
import { fetchUser } from '../../store/user/action';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const { Content, Header } = Layout;

export default function ListUser() {
    const { isUserLoading, isUserSuccess, isUserError } = useSelector((state) => state.user)
    const [state, setState] = useState({ data: [], loading: false, hasMore: true })

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (!!isUserError) {
            message.error(isUserError?.message ?? 'something went wrong');
        }
    }, [isUserError])

    return (
        <Layout style={{ height: '100vh' }}>
            <AdminNavbar />
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '100%' }}>
                        <div className="demo-infinite-container">
                            <div>{isUserSuccess.toString()}</div>
                            <List
                                dataSource={isUserSuccess}
                                renderItem={item => (
                                    <List.Item key={item?.id}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title={<a href="https://ant.design">{item?.firstName} {item?.lastName}</a>}
                                            description={item?.email}
                                        />
                                        <div>Content</div>
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