import React, { useState, useEffect } from 'react'
import { Layout, List, message, Avatar, Spin } from 'antd'
import { AdminFooter, AdminNavbar } from '../../components'
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const { Content, Header } = Layout;

export default function ListUserStatus() {
    const [state, setState] = useState({ data: [], loading: false, hasMore: true })

    useEffect(() => {
        fetchData((res) => {
            setState({
                ...state,
                data: res.results,
            })
        })
    }, [])

    const fetchData = callback => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                console.log({ res })
                callback(res);
            },
        });
    };

    const handleInfiniteOnLoad = () => {
        let { data } = state;
        setState({
            ...state,
            loading: true,
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            setState({
                ...state,
                hasMore: false,
                loading: false,
            });
            return;
        }
        fetchData(res => {
            data = data.concat(res.results);
            setState({
                ...state,
                data,
                loading: false,
            });
        });
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <AdminNavbar />
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: '100%' }}>
                        <div className="demo-infinite-container">
                            <InfiniteScroll
                                initialLoad={false}
                                pageStart={0}
                                loadMore={handleInfiniteOnLoad}
                                hasMore={!state.loading && state.hasMore}
                                useWindow={false}
                            >
                                <List
                                    dataSource={state.data}
                                    renderItem={item => (
                                        <List.Item key={item.id}>
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                }
                                                title={<a href="https://ant.design">{item.name.last}</a>}
                                                description={item.email}
                                            />
                                            <div>Content</div>
                                        </List.Item>
                                    )}
                                >
                                    {state.loading && state.hasMore && (
                                        <div className="demo-loading-container">
                                            <Spin />
                                        </div>
                                    )}
                                </List>
                            </InfiniteScroll>
                        </div>
                    </div>
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    )
}