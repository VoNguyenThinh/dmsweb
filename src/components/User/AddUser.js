import React from 'react'
import { Form, Input, Button, Divider, Row, Col, Select, notification } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import userAPI from '../../api/setup/usersApi'
import { Link } from 'react-router-dom';
import * as CF from '../../constants/config'
export default function AddUser() {
    const handleSubmit = (values) => {
        const addUser = async () => {
            try {
                await userAPI.addUser(values)
                notification.success({
                    message: <b>Sucess </b>,
                    description: 'Add new user success!!',
                    style: { marginTop: '30px' }
                })
            } catch (error) {
                notification.error({
                    message: <b>Error </b>,
                    description: 'Username already exists',
                    style: { top: "30px" }
                })
                console.log('Failed to post: ', error);
            }
        }
        addUser();
    }

    return (
        <Row align="middle" style={{ height: '545px', background: '#f0f2f5' }}>
            <Col xs={2} sm={4} md={6} lg={8} xl={7} span={7}>
            </Col>

            <Col
                xs={20} sm={16} md={12} lg={8} xl={10} span={6}>

                <Divider plain><b>ADD NEW USER</b></Divider>
                <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    onFinish={handleSubmit}
                    initialValues={{ is_admin: false }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            { required: true, message: 'Please input username !' },
                            { type: 'email', message: 'Invalid email format! ' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input password !' },
                            { min: 5, message: 'Minimum 5 characters.' },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Full name"
                        name="fullname"
                        rules={[
                            { required: true, message: 'Please input full name !' },
                            { min: 5, message: 'Minimum 5 characters.' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name='is_admin' label="Role">
                        <Select placeholder="Select role">
                            <Select.Option value={true}>--- Admin</Select.Option>
                            <Select.Option value={false}>--- User</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
                        <Button shape='round' block size='large' type="primary" htmlType="submit" icon={<SaveOutlined />}>
                            Save change
                        </Button>
                        <Button shape='round' block size='large' type="link" htmlType="submit" icon={<ArrowLeftOutlined />}>
                            <Link to={CF.PATH.MaUSERS}>Back to list</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={7} span={9}>
            </Col>
        </Row >

    )
}
