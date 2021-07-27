import { Layout, Modal } from 'antd';
import React, { useState } from 'react'
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import auth from '../SignIn/auth';
import { Link } from 'react-router-dom';
// ----------------------------------------------------------
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';
export default function DinamicHeader(props) {
    const { Header } = Layout;
    const history = useHistory()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleMenuClick = () => {
        auth.logout(() => {
            localStorage.clear()
            history.push("/login")
        })
    }
    const menu = (
        <Menu >
            <Menu.Item onClick={handleMenuClick} key="1" icon={<LoginOutlined />}>
                Log out
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to='/'>Change Password</Link>
            </Menu.Item>
        </Menu>
    )
    // ---------------------------------------------

    // --------------------------------------------
    return (
        <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: '0 100px 0 0 ', color: "white", textAlign: 'right' }}>
                <Dropdown.Button onClick={showModal} overlay={menu} placement="bottomCenter" icon={<UserOutlined />} size='large'>
                    {props.name}

                </Dropdown.Button>
                <Modal title="User information" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                    <h3>Username:</h3>
                </Modal>
            </Header>
        </Layout>
    )
}
