import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Table, Tag, Button, Row, Col, Divider } from 'antd';
import { RedoOutlined, LeftCircleOutlined } from '@ant-design/icons'
import userApi from '../../api/setup/usersApi'

export default function HistoryUsed() {
    const { id } = useParams()
    const [data, setData] = useState()
    // const history = useHistory()
    const pagination = {
        position: ["bottomcenter"],
        defaultPageSize: 10,
        pageSize: 8
    }

    useEffect(() => {
        const params = {
            id: id
        }
        const HistoryUser = async () => {
            try {
                const response = await userApi.historyUsed(params);
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        HistoryUser();
    }, [id]);

    const columns = [
        {
            title: 'ID ',
            dataIndex: ['device_request', 'id'],
            key: 'id',
            width: '5%',
            align: 'center'
        },
        {
            title: 'DECIVE NAME ',
            dataIndex: ['device_request', 'device', 'device_name'],
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
            dataIndex: ['device_request', 'user', 'fullname'],
            key: 'username',
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
            dataIndex: ['user_accept', 'fullname'],
            key: 'user_accept',
            width: '15%',
            align: 'center'
        },
        {
            title: 'REQUEST AT',
            dataIndex: ['device_request', 'created_at'],
            key: 'created_at',
            render: (text) => {
                return <Tag color='cyan'>{text}</Tag>
            },
            align: 'center',
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

    ]
    const handeleResh = () => {
        const params = {
            id: id
        }
        const HistoryUser = async () => {
            try {
                const response = await userApi.historyUsed(params);
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        HistoryUser();
    }
    return (
        <>
            <Row>

                <Col span={24}>
                    <Divider style={{ margin: '0px' }} orientation="center">HISTORY USERD</Divider>
                    <Button size='middle' align="right" style={{ marginBottom: '5px', marginRight: '7px' }} onClick={handeleResh} icon={<LeftCircleOutlined />} type='primary'>
                        Back to list
                    </Button>
                    <Button size='middle' align="right" style={{ marginBottom: '5px' }} onClick={() => { document.location.reload(); }} icon={<RedoOutlined />} type='primary'>
                        Refesh
                    </Button>
                </Col>
                <Col span={24}>
                    <Table size='middle' columns={columns} pagination={pagination} dataSource={data}
                        rowKey={record => record.device_request.id}
                        expandable={{
                            expandedRowRender: record => <p style={{ marginLeft: '20px' }}>{record.device_request.device.decription}</p>,
                        }}
                    />
                </Col>
            </Row>
        </>
    )
}