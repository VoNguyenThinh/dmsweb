import { Table, Tag, Space, Button, Row, Form, Col, Input, Popconfirm, notification, message } from 'antd';
import { UserAddOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as CF from '../../constants/config'
import usersApi from '../../api/setup/usersApi'

export default function MaUsers() {
    const [data, setData] = useState()
    const { Search } = Input;
    const onSearch = value => {
        if (!value) {
            message.warning('Please input')
            return
        }
        console.log(value)
    }
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
        pageSize: 5
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
            render: text => <p>{text}</p>,
        },
        {
            title: 'ROLE',
            dataIndex: 'is_admin',
            key: 'is_admin',
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
        <Row >
            <Col style={{ marginBottom: '10px' }} span={24}>
                <Space>
                    <Button size='large' type='primary' icon={<UserAddOutlined />}>
                        <Link to={CF.PATH.ADDUSER} style={{ color: "white" }}> Add new user</Link>
                    </Button>
                    <Form>
                        <Search
                            placeholder="Input username"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                        />
                    </Form>
                </Space>

            </Col>
            <Col span={24}>
                <Table pagination={pagination} dataSource={data} columns={columns} rowKey={'id'} />
            </Col>
        </Row>

    )
}
