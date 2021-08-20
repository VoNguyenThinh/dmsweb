import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Space, Table, Tag, Input } from 'antd';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { BarsOutlined, EditOutlined, RedoOutlined, LaptopOutlined, DesktopOutlined, MobileOutlined, SearchOutlined } from '@ant-design/icons';
import devicesAPI from '../../api/setup/devicesAPI'
import * as CF from '../../constants/config'
import { Role } from '../../utils/FuntionConfig'
export default function AdDevices() {
    const [data, setData] = useState()
    const [searchText, searchedColumn] = useState()
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
                    placeholder={`Search here`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
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
        confirm();
        // searchedColumn(selectedKeys[0])
        const params = {
            device: selectedKeys[0]
        }
        const searchDivice = async () => {
            try {
                const response = await devicesAPI.searchDevice(params);
                console.log(response.data)
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        searchDivice();
    };

    const handleReset = clearFilters => {
        clearFilters();
        searchedColumn({})
    };
    // ------------------------------------------------------------------------------


    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: "10%" },
        {
            title: 'NAME', dataIndex: 'device_name', key: 'device_name', width: "20%",
            ...getColumnSearchProps('device_name'),
        },
        {
            title: 'TYPE',
            dataIndex: 'device_type',
            key: 'device_type',
            width: "17.5%",
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
                    value: 'Desktop',
                },
            ],
            onFilter: (value, record) => {
                return record.device_type.indexOf(value) === 0
            },
            render: (text) => {
                if (text === 'Laptop') {
                    return (
                        <Tag icon={<LaptopOutlined />} color='geekblue'>{text}</Tag>
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
                        <Tag icon={<DesktopOutlined />} color='gold'>{text}</Tag>
                    );
                }
            }
        },

        {
            title: 'STATUS', dataIndex: 'is_active', key: 'is_active',
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
    return (
        <div>

            <Row>

                <Col span={24}>

                    <Button align="right" style={{ marginBottom: '5px' }} onClick={() => { document.location.reload(); }} icon={<RedoOutlined />} type='primary'>
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

        </div >
    )
}