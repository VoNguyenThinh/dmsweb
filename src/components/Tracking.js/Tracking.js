import React, { useEffect, useState } from 'react'
import { Table, Tag, Space, Form, Button, DatePicker, message } from 'antd';
import trackingAPI from '../../api/setup/trackingAPI';
export default function Tracking() {
    const [data, setData] = useState()

    const pagination = {
        position: ["bottomcenter"],
        defaultPageSize: 10,
        pageSize: 7
    }
    const columns = [
        {
            title: 'ID ',
            dataIndex: 'id',
            key: 'id',
            width: '7%',
            align: 'center'
        },
        {
            title: 'DECIVE NAME ',
            dataIndex: 'devicename',
            key: 'devicename',
            align: 'center',
            render: (text) => {
                if (text === null) {
                    return (
                        <Tag>No data</Tag>
                    )
                } else {
                    return (
                        text
                    )
                }
            },
        },
        {
            title: 'USER NAME',
            dataIndex: 'username',
            key: 'username',
            width: '26%',
            align: 'center',
            render: (text) => {
                if (text === null) {
                    return (
                        <Tag>No data</Tag>
                    )
                } else {
                    return (
                        text
                    )
                }
            },
        },
        {
            title: 'ACEPTED BY',
            dataIndex: 'user_accept',
            key: 'user_accept',
            width: '15%',
            align: 'center'
        },
        {
            title: 'ACEPTED AT',
            dataIndex: 'engage_date_start',
            key: 'engage_date_start',
            render: (text) => {
                return <Tag color='lime'>{text}</Tag>
            },
            align: 'center',
            width: '15%'
        },
        {
            title: 'GIVE BACK AT',
            dataIndex: 'engage_date_end',
            key: 'engage_date_end',
            render: (text) => {
                if (text === null) {
                    return (
                        <Tag color="green">RUNING</Tag>
                    )
                } else {
                    return (
                        <Tag color='gold'>{text}</Tag>
                    )
                }
            },
            align: 'center',
            width: '15%'
        },

    ];

    useEffect(() => {
        const AcceptedDevice = async () => {
            try {
                const response = await trackingAPI.getAll();
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        AcceptedDevice();
    }, []);
    const find = (value) => {
        const parseStart = Date.parse(value.engage_date_start._d)
        const parseEnd = Date.parse(value.engage_date_end._d)
        if (parseStart < parseEnd) {
            const start = value.engage_date_start.format("YYYY-MM-DD")
            const end = value.engage_date_end.format("YYYY-MM-DD")
            value.engage_date_start = start
            value.engage_date_end = end
            //[CallAPI - by time]
            const fillterByTime = async () => {
                try {
                    const response = await trackingAPI.trackingBytime(value);
                    setData(response.data)
                } catch (error) {
                    console.log('Failed to fetch: ', error);
                }
            }
            fillterByTime();
        } else {
            message.error('End date incorrect !!', [1.3])
        }
    }

    return (
        <>
            <Form
                onFinish={find}
            >
                <Space style={{ marginBottom: '1px' }}>
                    <Form.Item name='engage_date_start' label='From' rules={[{ required: true, message: 'Please start date' }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name='engage_date_end' label='To' rules={[{ required: true, message: 'Please end date' }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type="primary">Find</Button>
                    </Form.Item>
                </Space>
            </Form>

            <Table rowKey={'id'} size='large' columns={columns} pagination={pagination} dataSource={data} />
        </>

    )
}
