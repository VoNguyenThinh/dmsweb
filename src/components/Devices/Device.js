import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Space, Table, Tag, Input } from 'antd';
import { Link } from 'react-router-dom';
import { BarsOutlined, EditOutlined } from '@ant-design/icons';
import devicesAPI from '../../api/setup/devicesAPI'
import * as CF from '../../constants/config'
import { Role } from '../../utils/FuntionConfig'
export default function AdDevices() {
    const { Search } = Input;

    const [data, setData] = useState()
    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                // const params = {
                //     decice_name: 'Devices 1'
                // }
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
        pageSize: 6
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
        { title: 'CREATE_AT', dataIndex: 'created_at', key: 'created_at', width: "17.5%", align: 'center' },
        {
            title: 'ACTION', key: 'created_at', align: 'center', render: (record) => {
                const role = Role()
                if (role === 'admin') {
                    return (
                        <Space size="middle">
                            <Button size='middle' type='primary' icon={<BarsOutlined />}>
                                <Link style={{ color: "white" }} to={CF.PATH.DETAIL_DEVICES + `/${record.id}`} > &nbsp; Detail</Link>
                            </Button>
                            <Button size='middle' type='primary' icon={<EditOutlined />}>
                                <Link to={CF.PATH.EDITDEVICES + `/${record.id}`} style={{ color: "white" }}> &nbsp; Edit</Link>
                            </Button>
                        </Space>
                    )
                } else {
                    return (
                        <Space size="middle">
                            <Button size='middle' type='primary' icon={<BarsOutlined />}>
                                <Link style={{ color: "white" }} to={CF.PATH.DETAIL_DEVICES + `/${record.id}`} > &nbsp; Detail</Link>
                            </Button>
                        </Space>
                    )

                }
            },
            width: '21%'
        },

    ];
    const onSearch = value => console.log(value);
    return (
        <div>

            <Row>
                <Col>
                    <Form
                    >
                        <Search
                            placeholder="Input devices name"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                            style={{ marginBottom: '5px' }}
                        />
                    </Form>
                </Col>
                <Col span={24}>
                    {/* <Divider style={{ marginBottom: '15px', marginTop: '5px' }} orientation="left">Device List</Divider> */}
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