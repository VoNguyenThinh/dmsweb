import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import { LaptopOutlined, CheckCircleOutlined, PullRequestOutlined, UserOutlined, PlusCircleOutlined, HistoryOutlined, UserAddOutlined, OrderedListOutlined } from '@ant-design/icons';
import * as URL from '../../constants/config'
export default function Sidebar(props) {
    const isRole = props.role
    const { SubMenu } = Menu;
    const renderItem = () => {
        if (isRole) {
            return (
                <Menu theme='dark' defaultSelectedKeys={['']}>
                    <Menu.Item key='1' icon={<LaptopOutlined />}>
                        <Link to={URL.PATH.DEVICES}>Devices</Link>
                    </Menu.Item>
                    <Menu.Item key='2' icon={<PlusCircleOutlined />}>
                        <Link to={URL.PATH.ADDDEVICES}>Add new devices</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<UserOutlined />} title="Manage User">
                        <Menu.Item key='3' icon={<OrderedListOutlined />}>
                            <Link to={URL.PATH.MaUSERS}>User List</Link>
                        </Menu.Item>
                        <Menu.Item key='4' icon={<UserAddOutlined />}>
                            <Link to={URL.PATH.ADDUSER}>Add new user</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key='5' icon={<PullRequestOutlined />}>
                        <Link to={URL.PATH.REQUEST}>Manage request</Link>
                    </Menu.Item>
                    <Menu.Item key='6' icon={<CheckCircleOutlined />}>
                        <Link to={URL.PATH.ACCEPTED}>Accepted devices</Link>
                    </Menu.Item>
                </Menu>
            )
        } else {
            return (
                <Menu theme='dark' defaultSelectedKeys={['1']}>
                    <Menu.Item key='1' icon={<LaptopOutlined />}>
                        <Link to={URL.PATH.DEVICES}>Devices</Link>
                    </Menu.Item>
                    <Menu.Item key='2' icon={<HistoryOutlined />}>
                        <Link to={URL.PATH.DVHISTORY} >Devices history</Link>
                    </Menu.Item>
                </Menu>
            )
        }
    }

    return (
        renderItem(props.role)
    )
}
