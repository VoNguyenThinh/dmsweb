import React from 'react'
import { Form, Input, Button, Divider, Row, Col, Select, notification } from 'antd';
import { Link } from 'react-router-dom';
import * as CF from '../../constants/config'
import devicesAPI from '../../api/setup/devicesAPI'
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';

export default function AddDevices() {
    const type = 'Phone'
    const status = true
    const description = 'No description'
    const handleSubmit = (values) => {
        console.log(values)
        const addDevice = async () => {
            try {
                await devicesAPI.addDevice(values)
                notification.success({
                    message: <b>Sucess </b>,
                    description: 'Add new devices success!!',
                    style: { marginTop: '30px' }
                })
            } catch (error) {
                notification.error({
                    message: <b>Error </b>,
                    description: 'Devices already exists',
                    style: { top: "30px" }
                })
                console.log('Failed to post: ', error);
            }
        }
        addDevice();
    }
    return (
        <Row align="middle" style={{ height: '545px', background: '#f0f2f5' }}>
            <Col xs={2} sm={4} md={6} lg={8} xl={7} span={7}>
            </Col>

            <Col
                xs={20} sm={16} md={12} lg={8} xl={10} span={6}>

                <Divider plain><b>ADD NEW DEVICES</b></Divider>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 19 }}
                    onFinish={handleSubmit}
                    initialValues={
                        {
                            device_type: type,
                            is_active: status,
                            decription: description
                        }
                    }
                >
                    <Form.Item
                        label="Devices name"
                        name="device_name"
                        rules={[
                            { required: true, message: 'Please input devicesname !' },
                        ]}
                    >
                        <Input placeholder="Device name" />
                    </Form.Item>
                    <Form.Item name='device_type' label="Devices Type">
                        <Select >
                            <Select.Option value={'Phone'}>Phone</Select.Option>
                            <Select.Option value={'Tablet'}>Tablet </Select.Option>
                            <Select.Option value={'Laptop'}>Laptop</Select.Option>
                            <Select.Option value={'Desktop Computer'}>Desktop Computer</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name='is_active' label="Devices Status">
                        <Select >
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
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 19 }}>
                        <Button shape='round' block size='large' type="primary" htmlType="submit" icon={<SaveOutlined />}>
                            Save change
                        </Button>
                        <Button shape='round' block size='large' type="link" htmlType="submit" icon={<ArrowLeftOutlined />}>
                            <Link to={CF.PATH.DEVICES}>Back to list</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={7} span={9}>
            </Col>
        </Row >

    )
}
