import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Col, Row, Space, Table, Tag, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { BarsOutlined } from '@ant-design/icons';
import devicesAPI from '../../api/setup/devicesAPI'
import * as CF from '../../constants/config'

export default function MaDevices() {
    const { Search } = Input;
    const [data, setData] = useState()
    const onSearch = value => console.log(value);
    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const response = await devicesAPI.getAll();
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fetchAllUser();
    }, []);
    const pagination = {
        position: ["bottomcenter"],
        defaultPageSize: 10,
        pageSize: 7
    }

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: "10%" },
        { title: 'NAME', dataIndex: 'device_name', key: 'device_name', width: "20%" },
        {
            title: 'TYPE', dataIndex: 'device_type', key: 'device_type', width: "17.5%", render: (text) => {
                return <Tag color='geekblue'>{text}</Tag>
            }
        },
        {
            title: 'STATUS', dataIndex: 'is_active', key: 'is_active', render: is_active => {
                if (is_active) {
                    return (
                        <Tag color='green'>Available</Tag>
                    )
                } else {
                    return (
                        <Tag color='red'>Unavailable</Tag>
                    )
                }
            }
        },
        { title: 'CREATE_AT', dataIndex: 'created_at', key: 'created_at', width: "17.5%" },
        {
            title: 'ACTION', key: 'created_at', render: (record) => (
                <Space size="middle">
                    <Button size='middle' type='primary' icon={<BarsOutlined />}>
                        <Link to={CF.PATH.EDITDEVICES + `/${record.id}`} style={{ color: "white" }}> &nbsp; Edit</Link>
                    </Button>

                </Space>
            ),
        },

    ];

    return (
        <div>
            <Row>
                <Col>
                    <Form>
                        <Search
                            placeholder="Input search text"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                            style={{ marginBottom: '5px' }}
                        />
                    </Form>
                    {/* <Button>asdasd</Button> */}
                </Col>
                <Col span={24}>
                    <Table
                        size='middle'
                        pagination={pagination}
                        rowKey={'id'}
                        columns={columns}
                        expandable={{
                            expandedRowRender: record => <p style={{ margin: 0 }}>{record.decription}</p>,
                        }}
                        dataSource={data}
                    />
                </Col>
            </Row>
        </div>
    )
}
