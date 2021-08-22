import React, { useEffect, useRef, useState } from 'react'
import { Table, Tag, Button, Row, Col, Divider, Space, Input } from 'antd';
import trackingAPI from '../../api/setup/trackingAPI';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import '../../assets/styles/index.css'

export default function DeviHistory() {
    const [data, setData] = useState()
    const [searchText, setText] = useState('')
    const searchInput = useRef(null);

    const pagination = {
        position: ["bottomcenter"],
        defaultPageSize: 10,
        pageSize: 8
    }
    useEffect(() => {
        const AcceptedDevice = async () => {
            try {
                const response = await trackingAPI.TrakingUser();
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error, searchText);
            }
        }
        AcceptedDevice();
    }, [searchText]);

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
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
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => {
            if (record.device_request.device.device_name) {
                return record.device_request.device.device_name.toString().toLowerCase().includes(value.toLowerCase())
            } else {
                return ''
            }

        }
        ,
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
    });

    const handleSearch = (selectedKeys, confirm,) => {
        confirm();
        setText(selectedKeys[0])
    };

    const handleReset = clearFilters => {
        clearFilters();
    };

    const handdleRefesh = () => {
        const AcceptedDevice = async () => {
            try {
                const response = await trackingAPI.TrakingUser();
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error, searchText);
            }
        }
        AcceptedDevice();
    }

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
            key: 'device_name',
            align: 'center',
            ...getColumnSearchProps("device_name"),
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

    ];

    return (
        <>
            <Row>
                <Col span={24}>
                    <Divider style={{ margin: '0px' }} orientation="center">DEVICES LIST</Divider>
                    <Button size='middle' align="right" style={{ marginBottom: '5px' }} onClick={handdleRefesh} icon={<RedoOutlined />} type='primary'>
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
