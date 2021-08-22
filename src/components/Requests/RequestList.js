import React, { useEffect, useRef, useState } from 'react'
import { Table, Space, Button, Popconfirm, Divider, Input, Tag, notification } from 'antd';
import { CheckSquareOutlined, MinusCircleOutlined, InfoCircleOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons';
import reqAPI from '../../api/setup/reqApi';
import '../../assets/styles/index.css'

export default function RquestList() {
    const [data, setData] = useState()
    const searchInput = useRef(null);
    useEffect(() => {
        const fetchAllReq = async () => {
            try {
                const response = await reqAPI.getAll();
                setData(response.data)
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
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search here`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    style={{ marginBottom: 8, display: 'block' }}
                    size='middle'
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
    const handleSearch = (selectedKeys) => {
        const params = {
            search: selectedKeys[0]
        }
        const searchReq = async () => {
            try {
                const response = await reqAPI.searchReq(params);
                console.log(response.data)
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        searchReq();
    };
    const handleReset = clearFilters => {
        clearFilters();
        document.location.reload()
    };

    const columns = [
        {
            title: 'ID REQ',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            render: text => {
                return <b>{text}</b>

            }
        },
        {
            title: `USER'S NAME`,
            dataIndex: ["user", 'fullname'],
            key: 'fullname',
            ...getColumnSearchProps('fullname')
        },
        {
            title: `DEVICE'S NAME`,
            dataIndex: ["device", 'device_name'],
            key: 'devicename',
            ...getColumnSearchProps('devicename')

        },
        {
            title: 'DEVICE TYPE',
            dataIndex: ["device", 'device_type'],
            key: 'devicetype',
            filters: [
                {
                    text: 'Phone',
                    value: 'Phone',
                },
                {
                    text: 'Tablet',
                    value: 'Tablet',
                },
                {
                    text: 'Laptop',
                    value: 'Laptop',
                },
                {
                    text: 'Desktop',
                    value: 'Desktop computer',
                },

            ],
            onFilter: (value, record) => {
                return record.device.device_type.indexOf(value) === 0
            },
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
