import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import { LaptopOutlined, LineChartOutlined, UserOutlined, ToolOutlined, HistoryOutlined } from '@ant-design/icons';
import * as URL from '../../constants/config'
export default function Sidebar(props) {

    const isRole = props.role
    const renderItem = () => {
        if (isRole) {
            return (
                <Menu theme='dark' defaultSelectedKeys={['1']}>
                    <Menu.Item key='1' icon={<LaptopOutlined />}>
                        <Link to={URL.PATH.DEVICES}>Devices</Link>
                    </Menu.Item>
                    <Menu.Item key='2' icon={<ToolOutlined />}>
                        <Link to={URL.PATH.MaDEVICES}>Manage Devices</Link>
                    </Menu.Item>
                    <Menu.Item key='3' icon={<UserOutlined />}>
                        <Link to={URL.PATH.MaUSERS}>Manage User</Link>
                    </Menu.Item>
                    <Menu.Item key='4' icon={<LineChartOutlined />}>
                        <Link to={URL.PATH.MaTRACKING}>Devices traking</Link>
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
