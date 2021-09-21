import { Layout, Menu, } from 'antd'
import {
    Link, useLocation
} from 'react-router-dom'
const { Sider } = Layout

export default function AdminNavbar() {
    const { pathname } = useLocation()
    let menuKey;
    switch (pathname) {
        case '/listUser':
            menuKey = "1"
            break;
        case '/listUserStatus':
            menuKey = "2"
            break;
        case '/listLoan':
            menuKey = "3"
            break;
        default:
            break;
    }
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[menuKey]}>
                <Menu.Item key="1" >
                    <Link to='/listUser'>List User</Link>
                </Menu.Item>
                <Menu.Item key="2" >
                    <Link to='/listUserStatus'>List User Status</Link>
                </Menu.Item>
                <Menu.Item key="3" >
                    <Link to='/listLoan'>List Loan</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}