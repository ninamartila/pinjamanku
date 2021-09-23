import { Image, Layout, Menu, } from 'antd'
import imageLogo from '../img/Frame_2_1.png'
import {
    Link, useLocation
} from 'react-router-dom'
const { Sider } = Layout

export default function AdminNavbar() {
    const { pathname } = useLocation()
    let menuKey;
    switch (pathname) {
        case '/admin-dashboard/borrower':
            menuKey = "1"
            break;
        case '/admin-dashboard/lender':
            menuKey = "2"
            break;
        case '/admin-dashboard/pendingborrower':
            menuKey = "3"
            break;
        case '/admin-dashboard/listLoan':
            menuKey = "4"
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
            width={250}
        >
            <div className="logo" style={{ height: 100 }} >
                <Image
                    preview={false}
                    src={imageLogo}
                    width={250}
                    height={90}
                />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[menuKey]}>
                <Menu.Item key="1" >
                    <Link to='/admin-dashboard/borrower'>
                        <p style={{ fontSize: 20, marginTop: 20 }}>List Borrower</p>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" >
                    <Link to='/admin-dashboard/lender'>
                        <p style={{ fontSize: 20, marginTop: 20 }}>List Lender</p></Link>
                </Menu.Item>
                <Menu.Item key="3" >
                    <Link to='/admin-dashboard/pendingborrower'>
                        <p style={{ fontSize: 20, marginTop: 20 }}>List Pending Borrower</p></Link>
                </Menu.Item>
                <Menu.Item key="4" >
                    <Link to='/admin-dashboard/listLoan'>
                        <p style={{ fontSize: 20, marginTop: 20 }}>List Loan</p></Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}