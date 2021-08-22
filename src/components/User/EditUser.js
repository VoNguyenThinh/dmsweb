import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Form, Input, Button, Divider, Row, Col, Select, notification, Space } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import usersApi from '../../api/setup/usersApi'
import { Link } from 'react-router-dom';
import * as CF from '../../constants/config'
export default function EditUser() {
    let { id } = useParams()
    const [form] = Form.useForm();
    const history = useHistory()

    const [username, setUserame] = useState('')
    let change = false
    // ------------------------------GetAPI--------------------------
    useEffect(() => {
        const fetchUserInfomation = async () => {
            try {
                const response = await usersApi.ViewUser(id);
                form.setFieldsValue({
                    fullname: response.data.fullname,
                    is_admin: response.data.is_admin
                })
                setUserame(response.data.username)

            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fetchUserInfomation();
    });

    // ---------------------------------------------------------------
    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Space>
                <Button type="primary" size="middle" style={{ background: 'green', border: "none" }} onClick={() => {
                    notification.close(key)
                    history.goBack()
                }}>
                    Go back
                </Button>
                <Button type="primary" size="middle" danger onClick={() => {
                    notification.close(key)
                }}>
                    Cancel
                </Button>
            </Space>
        );
        notification.open({
            message: <b>Notification</b>,
            description: "Update user success ! ",
            style: { marginTop: '30px' },
            btn,
            key
        });
    };
    // -------------------------------------------------------------
    const ChangeUSer = (values) => {
        values.id = id
        values.username = username
        values.image = ''
        if (change) {
            const updateUSer = async () => {
                try {
                    await usersApi.updateUser(values)
                    openNotification()
                } catch (error) {
                    console.log('Failed to fetch: ', error);
                }
            }
            updateUSer();
        } else {
            notification.warning({
                message: <b>Warning</b>,
                description: "Nothing changes",
                style: { marginTop: '30px' },

            });
        }

    }
    // ---------------------------------------------------------------
    return (
        <Row align="middle" style={{ height: '545px', background: '#f0f2f5' }}>
            <Col xs={2} sm={4} md={6} lg={8} xl={7} span={7}>
            </Col>

            <Col
                xs={20} sm={16} md={12} lg={8} xl={10} span={6}>

                <Divider plain><b>EDIT USER {id}</b></Divider>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    onFinish={ChangeUSer}
                >
                    <Form.Item
                        label="Fullname"
                        name='fullname'
                        rules={[
                            { required: false, message: 'Please input full name !' },
                            { min: 5, message: 'Minimum 5 characters.' }]}
                    >
                        <Input onChange={() => change = true} size='middle' />
                    </Form.Item>

                    <Form.Item name="is_admin" label="Role" labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19 }}>
                        <Select onChange={() => change = true} >
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
