import React, { useEffect, useState } from 'react'
import { Table, Tag, Space, Button, Popconfirm, notification, Divider } from 'antd';
// import { Link } from 'react-router-dom';
// import { CheckSquareOutlined } from '@ant-design/icons';
// import * as CF from '../../constants/config'
import reqAPI from '../../api/setup/reqApi';
import { InfoCircleOutlined } from '@ant-design/icons'
export default function AcceptedDevice() {
    const [data, setData] = useState()
    const pagination = {
        position: ["bottomcenter"],
        defaultPageSize: 10,
        pageSize: 7
    }
    useEffect(() => {
        const AcceptedDevice = async () => {
            try {
                const response = await reqAPI.getAccepted();
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        AcceptedDevice();
    }, []);
    const handleGiveBack = (id) => {
        const body = {
            id: id
        }
        const giveBack = async () => {
            try {
                await reqAPI.giveBack(body)
                notification.success({
                    message: <b>Sucess </b>,
                    description: 'Give back success!!',
                    style: { marginTop: '30px' }
                })
                const newData = [...data];
                setData(newData.filter(item => item.id !== id));
            } catch (error) {
                notification.error({
                    message: <b>Error </b>,
                    description: 'Error !',
                    style: { top: "30px" }
                })
                console.log('Failed to post: ', error);
            }
        }
        giveBack();
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
        },
        {
            title: 'USER ACCEPTED',
            dataIndex: 'username',
            key: 'username',
            width: '30%',
        },
        {
            title: 'DEVICE ACCEPTED',
            dataIndex: 'devicename',
            key: 'devicename',
            width: '30%',
        },
        {
            title: 'ACCEPTED AT',
            dataIndex: 'engage_date_start',
            key: 'engage_date_start',
            render: text => {
                return <Tag color='gold'>{text}</Tag>
            },
            align: 'center',
            width: '15%',
        },
        {
            title: 'STATUS',
            key: 'status',
            render: text => {
                return <Tag color='green'>RUNNING</Tag>
            },
            align: 'center',
            width: '15%',

        },

        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Popconfirm onConfirm={() => { handleGiveBack(record.id) }} icon={<InfoCircleOutlined />} title="Sure to give back ?">
                        <Button danger >Give back</Button>
                    </Popconfirm>
                </Space>
            ),
            width: '10%',
            align: 'center'

        },
    ];

    return (
        <>
            <Divider style={{ marginBottom: '25px', marginTop: '5px' }} orientation="left">Mange accepted devices</Divider>
            <Table rowKey={'id'} size='large' columns={columns} pagination={pagination} dataSource={data} />

        </>
    )
}
