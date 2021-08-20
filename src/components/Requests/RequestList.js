import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Popconfirm, Divider, Tag, notification } from 'antd';
import { CheckSquareOutlined, MinusCircleOutlined, InfoCircleOutlined, RedoOutlined } from '@ant-design/icons';
import reqAPI from '../../api/setup/reqApi';
import '../../assets/styles/index.css'

export default function RquestList() {
    const [data, setData] = useState()
    useEffect(() => {
        const fetchAllReq = async () => {
            try {
                const response = await reqAPI.getAll();
                setData(response.data)
                console.log(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fetchAllReq();
    }, []);

    const handleDecline = (id) => {
        const body = {
            id: id,
            request_status: "decline"
        }
        const declineReq = async () => {
            try {
                await reqAPI.acceptReq(body)
                notification.success({
                    message: <b>Sucess </b>,
                    description: 'Delince success!!',
                    style: { marginTop: '30px' }
                })
                const newData = [...data];
                setData(newData.filter(item => item.id !== id));
            } catch (error) {
                notification.error({
                    message: <b>Error </b>,
                    description: '!',
                    style: { top: "30px" }
                })
                console.log('Failed to post: ', error);
            }
        }
        declineReq();
        const newData = [...data];
        setData(newData.filter(item => item.id !== id));
    }
    const handleAcept = (id) => {
        const body = {
            id: id,
            request_status: "accept"
        }
        const acceptReq = async () => {
            try {
                await reqAPI.acceptReq(body)
                notification.success({
                    message: <b>Sucess </b>,
                    description: 'Accept success!!',
                    style: { marginTop: '30px' }
                })
                const newData = [...data];
                setData(newData.filter(item => item.id !== id));
            } catch (error) {
                notification.error({
                    message: <b>Error </b>,
                    description: '!',
                    style: { top: "30px" }
                })
                console.log('Failed to post: ', error);
            }
        }
        acceptReq();
        // const newData = [...data];
        // setData(newData.filter(item => item.id !== id));
    }
    const pagination = {
        position: ["bottomcenter"],
        defaultPageSize: 10,
        pageSize: 7
    }
    const columns = [
        {
            title: 'ID REQ',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            render: text => {
                return <b>{text}</b>

            }
            // align: 'center'
        },
        {
            title: `USER'S NAME`,
            dataIndex: ["user", 'fullname'],
            key: 'fullname',
        },
        {
            title: `DEVICE'S NAME`,
            dataIndex: ["device", 'device_name'],
            key: 'devicename',
        },
        {
            title: 'DEVICE TYPE',
            dataIndex: ["device", 'device_type'],
            key: 'devicetype',
            render: text => {
                return <Tag color='geekblue'>{text}</Tag>
            },
            align: 'center'

        },
        {
            title: 'CREATED AT',
            dataIndex: 'created_at',
            key: 'created_at',
            render: text => {
                return <Tag color='orange'>{text}</Tag>
            },
            align: 'center'

        },

        {
            title: 'ACTION',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm onConfirm={() => { handleAcept(record.id) }} icon={<InfoCircleOutlined />} title="Sure to accept ?">
                        <Button ghost style={{ color: '#389e0d', background: '#389e0d', border: '1px solid #389e0d' }} icon={<CheckSquareOutlined />} type='primary'> Accept</Button>
                    </Popconfirm>
                    <Popconfirm onConfirm={() => { handleDecline(record.id) }} icon={<InfoCircleOutlined />} title="Sure to reject ?">
                        <Button icon={<MinusCircleOutlined />} danger type='default'> Reject</Button>
                    </Popconfirm>
                </Space>
            ),
            width: '20%',
            align: 'center'
        },
    ];

    return (
        <>
            <Divider style={{ margin: "0" }} orientation="center">Mange Request</Divider>
            <Button size='middle' align="right" style={{ marginBottom: '5px' }} onClick={() => { document.location.reload(); }} icon={<RedoOutlined />} type='primary'>
                Refesh
            </Button>
            <Table rowKey='id' size='middle' columns={columns} pagination={pagination} dataSource={data} />
        </>
    )
}
