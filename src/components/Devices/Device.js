import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row, Space, Table, Tag, Input, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { BarsOutlined, EditOutlined, RedoOutlined, LaptopOutlined, DesktopOutlined, MobileOutlined, SearchOutlined } from '@ant-design/icons';
import devicesAPI from '../../api/setup/devicesAPI'
import * as CF from '../../constants/config'
import { Role } from '../../utils/FuntionConfig'
import '../../assets/styles/index.css'

export default function AdDevices() {
    const [data, setData] = useState()
    const searchInput = useRef(null);

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
        pageSize: 6,

    }
    // ------------------------------------------------------------------------------
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search here`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    style={{ marginBottom: 8, display: 'block' }}
                    size='small'
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 95 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
    });
    const handleSearch = (selectedKeys, confirm) => {
        const params = {
            device: selectedKeys[0]
        }
        console.log(params)
        const searchDivice = async () => {
            try {
                const response = await devicesAPI.searchDevice(params);
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        searchDivice();
        confirm()
    };
    const handleReset = clearFilters => {
        clearFilters();
        document.location.reload()
    };
    const handlRefesh = () => {
        const fetchAllUser = async () => {
            try {
                const response = await devicesAPI.getAll();
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fetchAllUser();
    }
    // ------------------------------------------------------------------------------
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: "5%" },
        {
            title: 'NAME', dataIndex: 'device_name', key: 'device_name', width: "20%", align: 'center',

            ...getColumnSearchProps('device_name'),
        },
        {
            title: 'TYPE',
            dataIndex: 'device_type',
            key: 'device_type',
            width: "15%",
            align: 'center',
            ...getColumnSearchProps('device_type'),
            render: (text) => {
                if (text === 'Laptop') {
                    return (
                        <Tag icon={<LaptopOutlined />} color='magenta'>{text}</Tag>
                    );
                }
                if (text === 'Phone') {
                    return (
                        <Tag icon={<MobileOutlined />} color='cyan'>{text}</Tag>
                    );
                }
                if (text === 'Tablet') {
                    return (
                        <Tag icon={<MobileOutlined />} color='cyan'>{text}</Tag>
                    );
                } else {
                    return (
                        <Tag icon={<DesktopOutlined />} color='purple'>{text}</Tag>
                    );
                }
            }
        },
        {
            title: 'STATUS', dataIndex: 'is_active', key: 'is_active', align: 'center',

            filters: [
                {
                    text: 'Available',
                    value: "true",
                },
                {
                    text: 'Unavailable',
                    value: "false",
                },
            ],
            onFilter: (value, record) => {
                return record.is_active.toString().indexOf(value) === 0
            },

            render: is_active => {
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
        {
            title: 'CREATE_AT', dataIndex: 'created_at', key: 'created_at', width: "17.5%", align: 'center',
            render: text => {
                return <Tag color={'gold'}>{text}</Tag>
            }
        },
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
        },

    ];
    return (
        <>
            <Row>
                <Col span={24}>
                    <Divider style={{ margin: '0px' }} orientation="center">DEVICES LIST</Divider>
                    <Button size='middle' align="right" style={{ marginBottom: '5px' }} onClick={handlRefesh} icon={<RedoOutlined />} type='primary'>
                        Refesh
                    </Button>
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
        </ >
    )
}