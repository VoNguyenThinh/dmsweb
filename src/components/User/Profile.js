import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Divider, Row, Col, notification } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import usersApi from '../../api/setup/usersApi'

export default function Resetpwd() {
    const [name, setName] = useState('')
    const [username, setUername] = useState('')
    const [change, setChange] = useState(false)

    useEffect(() => {
        const fetchUserInfomation = async () => {
            try {
                const response = await usersApi.getUserIfo();
                setName(response.data.fullname)
                setUername(response.data.username)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fetchUserInfomation();
    }, []);
    // -------------------------Notification----------------------
    const openNotification = () => {
        console.log(Date.now())
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="large" style={{ background: 'green', border: "none" }} onClick={() => {
                notification.close(key)
                window.location.reload()
            }}>
                Confirm
            </Button>
        );
        notification.open({
            message: <b>Notification</b>,
            description: "Change information success ! ",
            style: { marginTop: '30px' },
            btn,
            key
        });
    };
    // ----------------------------------------------------------

    const changeIFO = () => {
        if (change) {
            const body = {
                fullname: name,
                image: ''
            }
            const changeIfomation = async () => {
                try {
                    await usersApi.changeIfo(body)
                    localStorage.setItem("usn", name)
                    openNotification()

                } catch (error) {
                    console.log('Failed to fetch: ', error);
                }
            }
            changeIfomation();
        }
        else {
            notification.warning({
                message: <b>Warning</b>,
                description: "Profile do not change",
                style: { marginTop: '30px' },

            });
        }
    }
    // ----------------------------------------------------------
    return (
        <Row align="middle" style={{ height: '545px', background: '#fafafb' }}>
            <Col xs={2} sm={4} md={6} lg={8} xl={8} span={7}>
            </Col>

            <Col
                xs={20} sm={16} md={12} lg={8} xl={8} span={6}>

                <Divider plain> <b>PROFILE</b></Divider>
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    onFinish={changeIFO}
                >
                    <Form.Item
                        label="Fullname"
                    >
                        <Input value={name} onChange={(e) => { setName(e.target.value); setChange(true) }} size='large' />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                    >
                        <Input disabled value={username} size='large' />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                    >
                        <Input type='password' disabled value='admin' size='large' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
                        <Button shape="round" size='large' type="primary" htmlType="submit" icon={<SaveOutlined />}>
                            Save
                        </Button>
                        <Button size='large' type="link" >
                            <Link to='/change-password'>Change Password</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </Col >

            < Col xs={2} sm={4} md={6} lg={8} xl={8} span={9} />
        </Row >
    )
}

