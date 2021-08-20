import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import { LaptopOutlined, CheckCircleOutlined, BarChartOutlined, PullRequestOutlined, UserOutlined, PlusCircleOutlined, HistoryOutlined, UserAddOutlined, OrderedListOutlined } from '@ant-design/icons';
import * as URL from '../../constants/config'
export default function Sidebar(props) {
    const isRole = props.role
    const { SubMenu } = Menu;
    const key = localStorage.getItem('selKey')
    const renderItem = () => {
        if (isRole) {
            return (
                <Menu theme='dark' defaultSelectedKeys={[key]}>
                    <Menu.Item onClick={() => { localStorage.setItem('selKey', '2') }} key='1' icon={<LaptopOutlined />}>
                        <Link to={URL.PATH.DEVICES}>Devices</Link>
                    </Menu.Item>
                    <Menu.Item onClick={() => { localStorage.setItem('selKey', '2') }} key='2' icon={<PlusCircleOutlined />}>
                        <Link to={URL.PATH.ADDDEVICES}>Add new devices</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<UserOutlined />} title="Manage User">
                        <Menu.Item onClick={() => { localStorage.setItem('selKey', '3') }} key='3' icon={<OrderedListOutlined />}>
                            <Link to={URL.PATH.MaUSERS}>User List</Link>
                        </Menu.Item>
                        <Menu.Item onClick={() => { localStorage.setItem('selKey', '4') }} key='4' icon={<UserAddOutlined />}>
                            <Link to={URL.PATH.ADDUSER}>Add new user</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item onClick={() => { localStorage.setItem('selKey', '5') }} key='5' icon={<PullRequestOutlined />}>
                        <Link to={URL.PATH.REQUEST}>Manage request</Link>
                    </Menu.Item>
                    <Menu.Item onClick={() => { localStorage.setItem('selKey', '6') }} key='6' icon={<CheckCircleOutlined />}>
                        <Link to={URL.PATH.ACCEPTED}>Accepted devices</Link>
                    </Menu.Item>
                    <Menu.Item onClick={() => { localStorage.setItem('selKey', '7') }} key='7' icon={<BarChartOutlined />}>
                        <Link to={URL.PATH.TRACKING}>Devices traking</Link>
                    </Menu.Item>
                </Menu>
            )
        } else {
            return (
                <Menu theme='dark' defaultSelectedKeys={[key]}>
                    <Menu.Item onClick={() => { localStorage.setItem('selKey', '1') }} key='1' icon={<LaptopOutlined />}>
                        <Link to={URL.PATH.DEVICES}>Devices</Link>
                    </Menu.Item>
                    <Menu.Item onClick={() => { localStorage.setItem('selKey', '2') }} key='2' icon={<HistoryOutlined />}>
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
