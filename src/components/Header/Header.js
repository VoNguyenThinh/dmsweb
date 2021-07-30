import { Layout, } from 'antd';
import React from 'react'
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// ----------------------------------------------------------
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';
export default function DinamicHeader(props) {
    const { Header } = Layout;
    const history = useHistory()

    const handleMenuClick = () => {
        localStorage.clear()
        history.push("/login")
    }
    const menu = (
        <Menu >
            <Menu.Item onClick={handleMenuClick} key="1" icon={<LoginOutlined />}>
                Log out
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to='/profile'>Profile</Link>
            </Menu.Item>
        </Menu>
    )
    // ---------------------------------------------

    // --------------------------------------------
    return (
        <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: '0 100px 0 0 ', color: "white", textAlign: 'right' }}>
                <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />} size='large'>
                    {props.name}
                </Dropdown.Button>
            </Header>
        </Layout>
    )
}
