import { Table, Tag, Space, Button, Row, Col, Input, Popconfirm, notification } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as CF from '../../constants/config'
import usersApi from '../../api/setup/usersApi'
import Highlighter from 'react-highlight-words';

export default function MaUsers() {
    const [data, setData] = useState()
    const [searchText, searchedColumn] = useState()
    // }

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const response = await usersApi.getAll();
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fetchAllUser();
    }, []);
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        // confirm();
        const params = {
            name: selectedKeys[0]
        }
        const searchUser = async () => {
            try {
                const response = await usersApi.SearchUser(params);
                // console.log(response.data)
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        searchUser();
    };

    const handleReset = clearFilters => {
        clearFilters();
        searchedColumn({})
    };

    const userDelete = (id) => {
        const body = {
            id: id
        }
        const deleteUser = async () => {
            try {
                await usersApi.deleteUser(body)
                notification.success({
                    message: <b>Sucess </b>,
                    description: 'success!!',
                    style: { marginTop: '30px' }
                })
                const newData = [...data];
                setData(newData.filter(item => item.id !== id));
            } catch (error) {
                notification.error({
                    message: <b>Error </b>,
                    description: 'incorrect!',
                    style: { top: "30px" }
                })
                console.log('Failed to post: ', error);
            }
        }
        deleteUser();
    }
    const pagination = {
        position: ["bottomcenter"],
        defaultPageSize: 10,
        pageSize: 6
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'USERNAME',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'FULLNAME',
            dataIndex: 'fullname',
            key: 'fullname',
            ...getColumnSearchProps('fullname'),
            render: text => <p>{text}</p>,
        },
        {
            title: 'ROLE',
            dataIndex: 'is_admin',
            key: 'is_admin',
            filters: [
                {
                    text: 'Admin',
                    value: "true",
                },
                {
                    text: 'User',
                    value: "false",
                },
            ],
            onFilter: (value, record) => {

                return record.is_admin.toString().indexOf(value) === 0
            },
            render: is_admin => {
                if (is_admin) {
                    return (
                        <Tag color='gold'>ADMIN</Tag>
                    )
                } else {
                    return (
                        <Tag color='lime'>USER</Tag>
                    )
                }
            }
        },
        {
            title: 'CREATE AT',
            dataIndex: 'created_at',
            key: 'create_at',
        },
        {
            title: 'ACTION',
            key: 'action',
            width: '15%',
            render: (record) => (
                <Space size="middle">
                    <Button size='middle' icon={<EditOutlined />} type='primary'>
                        <Link style={{ color: "white" }} to={CF.PATH.EDITUSER + `/${record.id}`}>Edit</Link>
                    </Button>
                    <Popconfirm icon={<InfoCircleOutlined />} title="Sure to delete ?" onConfirm={() => { userDelete(record.id) }}>
                        <Button icon={<DeleteOutlined />} danger type='default'>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Row >
                <Button align="right" style={{ marginBottom: '5px' }} onClick={() => { document.location.reload(); }} icon={<RedoOutlined />} type='primary'>
                    Refesh
                </Button>
                <Col span={24}>
                    <Table pagination={pagination} dataSource={data} columns={columns} rowKey={'id'} />
                </Col>
            </Row>
        </>
    )
}
