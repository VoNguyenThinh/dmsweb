import React, { useEffect, useRef, useState } from 'react'
import { Table, Tag, Space, Button, Popconfirm, notification, Input, Divider } from 'antd';
import reqAPI from '../../api/setup/reqApi';
import { InfoCircleOutlined, RedoOutlined, LeftCircleOutlined, SearchOutlined } from '@ant-design/icons'
import '../../assets/styles/index.css'

export default function AcceptedDevice() {
    const [data, setData] = useState()
    const searchInput = useRef(null);

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
                const response = await reqAPI.searchAcepted(params);
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
            ...getColumnSearchProps('username')
        },
        {
            title: 'DEVICE ACCEPTED',
            dataIndex: 'devicename',
            key: 'devicename',
            width: '30%',
            ...getColumnSearchProps('devicename')
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
                        <Button icon={<LeftCircleOutlined />} danger >Give back</Button>
                    </Popconfirm>
                </Space>
            ),
            width: '10%',
            align: 'center'

        },
    ];

    return (
        <>
            <Divider style={{ margin: '0' }} orientation="center">Mange accepted devices</Divider>
            <Button size='middle' align="right" style={{ marginBottom: '5px' }} onClick={() => { document.location.reload(); }} icon={<RedoOutlined />} type='primary'>
                Refesh
            </Button>
            <Table rowKey={'id'} size='middle' columns={columns} pagination={pagination} dataSource={data} />
        </>
    )
}
