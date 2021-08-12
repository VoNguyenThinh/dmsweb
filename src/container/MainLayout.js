import React from 'react'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Sidebar from '../components/Sider/Sidebar';
import DinamicHeader from '../components/Header/Header';
import jwt_decode from "jwt-decode";

export default function MainLayout(props) {
    const { Content, Footer, Sider } = Layout;
    const token = localStorage.getItem('access_token')
    const usname = localStorage.getItem('usn')
    let name_tmp = '';
    const userIfo = jwt_decode(token)
    if (!usname) {
        name_tmp = userIfo.fullname;
    } else {
        name_tmp = usname;
    }

    return (
        <>
            <Layout>
                <DinamicHeader name={name_tmp} />
                <Layout>
                    <Sider >
                        <Sidebar key='1' role={userIfo.is_admin} />
                    </Sider>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 593, background: "white" }}>
                            {props.children}
                        </div>
                    </Content>
                </Layout>
                <Layout>
                    <Footer style={{ textAlign: 'center' }}>MANAGE DEVICES 2021 </Footer>
                </Layout>
            </Layout>

        </>
    )
}
