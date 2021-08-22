import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Form, Input, Button, Divider, Row, Col, Select, notification, Space } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import devicesAPI from '../../api/setup/devicesAPI'

export default function EditDevices() {
    const [form] = Form.useForm();
    const { id } = useParams()
    const history = useHistory()
    let change = false
    // ------------------------------GetAPI--------------------------
    useEffect(() => {
        const DeviceInfomation = async () => {
            try {
                const response = await devicesAPI.ViewDevice(id);
                form.setFieldsValue({
                    device_name: response.data.device_name,
                    device_type: response.data.device_type,
                    is_active: response.data.is_active,
                    decription: response.data.decription
                })
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        DeviceInfomation();
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
                <Button type="primary" size="middle" style={{ border: "1px solid red", background: 'red' }} onClick={() => {
                    notification.close(key)
                }}>
                    Cancel
                </Button>
            </Space>
        );
        notification.open({
            message: <b>Notification</b>,
            description: "Update devices success ! ",
            style: { marginTop: '30px' },
            btn,
            key
        });
    };
    const handleSubmit = (values => {
        if (change) {
            values.id = id
            const EditDevices = async () => {
                try {
                    await devicesAPI.editDevice(values);
                    openNotification()
                } catch (error) {
                    notification.warning({
                        message: <b>Warning</b>,
                        description: "Error!",
                        style: { marginTop: '30px' },

                    });
                    console.log('Failed to fetch: ', error, change);
                }
            }
            EditDevices();
        } else {
            notification.warning({
                message: <b>Warning</b>,
                description: "Nothing change!",
                style: { marginTop: '30px' },
            });
        }

    }
    )
    return (
        <>
            <Row align="middle" style={{ height: '545px', background: '#f0f2f5' }}>
                <Col xs={2} sm={4} md={6} lg={8} xl={7} span={7}>
                </Col>

                <Col
                    xs={20} sm={16} md={12} lg={8} xl={10} span={6}>

                    <Divider plain><b>EDIT DEVICES</b></Divider>
                    <Form
                        name="edit"
                        form={form}
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19 }}
                        onFinish={handleSubmit}
                    >

                        <Form.Item
                            label="Devices name"
                            name='device_name'
                            rules={[
                                { required: true, message: 'Please input devicesname !' },
                            ]}
                        >
                            <Input onChange={() => { change = true; }} />
                        </Form.Item>

                        <Form.Item name='device_type' label="Devices Type">
                            <Select onChange={() => { change = true; }}>
                                <Select.Option value='Phone'>Phone</Select.Option>
                                <Select.Option value='Tablet'>Tablet </Select.Option>
                                <Select.Option value='Laptop'>Laptop</Select.Option>
                                <Select.Option value='Desktop Computer'>Desktop Computer</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name='is_active' label="Devices Status">
                            <Select onChange={() => { change = true; }}>
                                <Select.Option value={true}>Available</Select.Option>
                                <Select.Option value={false}>Unavailable</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name='decription'
                            rules={[
                                { required: true, message: 'Please input devices description !' },
                            ]}>

                            <Input.TextArea rows={3} onChange={() => { change = true; }} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
                            <Button shape='round' block size='large' type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                Save change
                            </Button>
                            <Button onClick={() => { history.goBack() }} shape='round' block size='large' type="link" htmlType="button" icon={<ArrowLeftOutlined />}>
                                Back to list
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={7} span={9}>
                </Col>
            </Row >
        </>
    )
}
