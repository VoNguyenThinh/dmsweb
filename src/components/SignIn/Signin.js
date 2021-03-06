import React, { useState } from 'react'
import loginApi from '../../api/setup/loginAPI'
// ----------------------------------------------------------------------------
import 'antd/dist/antd.css'
import { Form, Input, Button, Divider, Row, Col, notification } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
// -----------------------------------------------------------------------------

export default function Signin(props) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const history = useHistory()

    const Email = (e) => {
        setEmail(e.target.value)
    }
    const Pwd = (e) => {
        setPassword(e.target.value)
    }

    const login = () => {
        const body = {
            username: email,
            password: password
        }

        const login = async () => {
            try {
                const response = await loginApi.post(body)
                localStorage.setItem("access_token", response.data.jwt)
                localStorage.setItem("isLogin", "true")
                localStorage.setItem("selKey", "1")
                history.push('/devices')
            } catch (error) {
                // alert("User do not exist")
                notification.error({
                    message: <b>Notification </b>,
                    description: 'Error: Incorrect username or password !',
                })
                console.log('Failed to post: ', error);
            }
        }
        login();
    }

    return (
        <div className='container'>
            <div className='login-fomrm'>
                <Row align="middle" style={{ height: '750px', background: '#fafafb' }}>
                    <Col xs={2} sm={4} md={6} lg={8} xl={9} span={9} />

                    <Col style={{
                        background: 'white',
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                        borderRadius: '7px',
                        padding: '45px 30px 50px 30px',
                    }}
                        xs={20} sm={16} md={12} lg={8} xl={6} span={6}>

                        <Divider plain><h3>LOGIN FORM</h3></Divider>

                        <Form
                            onFinish={login}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, type: 'email', message: 'Invalid email format !' }]}
                            >
                                <Input onChange={Email} size='large' placeholder="Email" prefix={<UserOutlined />} />
                            </Form.Item>


                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password onChange={Pwd} size='large' placeholder="Password" prefix={<LockOutlined />} />
                            </Form.Item>

                            <Form.Item>
                                <Button block size='large' type="primary" htmlType="submit" icon={<KeyOutlined />}>
                                    LOGIN
                                </Button>
                            </Form.Item>

                        </Form>


                    </Col>

                    <Col xs={2} sm={4} md={6} lg={8} xl={9} span={9} />
                </Row>
            </div>
        </div >
    )
}
