import React, { useEffect, useRef, useState } from 'react'
import { Table, Tag, Space, Button, DatePicker, Divider, Input } from 'antd';
import trackingAPI from '../../api/setup/trackingAPI';
import '../../assets/styles/index.css'
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import moment from 'moment';
export default function Tracking() {
    const [data, setData] = useState()
    const [date, setDate] = useState([])
    const [searchText, setText] = useState('')
    const today = moment(new Date()).format('YYYY-MM-DD')
    const searchInput = useRef(null);

    const pagination = {
        position: ["bottomcenter"],
        defaultPageSize: 10,
        pageSize: 7
    }
    const { RangePicker } = DatePicker;
    useEffect(() => {
        const AcceptedDevice = async () => {
            try {
                const response = await trackingAPI.getAll();
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error, searchText);
            }
        }
        AcceptedDevice();
    }, [searchText]);
    const getColumnSearchProps = () => ({
        filterDropdown: ({ clearFilters, confirm }) => (
            <div style={{ padding: 15 }}>
                <RangePicker defaultValue={[moment(today, "YYYY-MM-DD"), moment(today, "YYYY-/MM-DD")]}
                    format={"YYYY-MM-DD"}
                    style={{ marginBottom: 8 }}
                    onChange={e => setDate(e ? e : [])}
                />
                <br />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 150 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 155 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    });
    const handleSearch = (confirm) => {
        confirm();
        let params = {
            engage_date_start: '',
            engage_date_end: ''
        }
        if (!date[0] || !date[1]) {
            params = {
                engage_date_start: today,
                engage_date_end: today
            }
        } else {
            params = {
                engage_date_start: date[0].format('YYYY-MM-DD'),
                engage_date_end: date[1].format('YYYY-MM-DD')
            }
        }
        console.log(params)

        const fillterByTime = async () => {
            try {
                const response = await trackingAPI.trackingBytime(params);
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fillterByTime();
    }
    const handleReset = clearFilters => {
        clearFilters();
        document.location.reload()
    };
    // -------------------------------------------------------------------
    const getColumnSearchProps2 = dataIndex => ({
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
                        onClick={() => handleSearch2(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset2(clearFilters)} size="small" style={{ width: 95 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => {
            if (dataIndex === 'user_accept') {
                if (record.user_accept.fullname) {
                    return record.user_accept.fullname.toString().toLowerCase().includes(value.toLowerCase())
                } else {
                    return ''
                }
            } else {
                if (record[dataIndex]) {
                    return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                } else {
                    return ''
                }
            }
        },

        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
    });
    const handleSearch2 = (selectedKeys, confirm) => {
        confirm()
        setText(selectedKeys[0])
    };
    const handleReset2 = clearFilters => {
        clearFilters();
    };
    const columns = [
        {
            title: 'ID ',
            dataIndex: 'id',
            key: 'id',
            width: '7%',
            align: 'center',
        },
        {
            title: 'DECIVE NAME ',
            dataIndex: 'devicename',
            key: 'devicename',
            align: 'center',
            ...getColumnSearchProps2('devicename'),
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
            dataIndex: 'username',
            key: 'username',
            width: '26%',
            align: 'center',
            ...getColumnSearchProps2('username'),
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
            align: 'center',
            ...getColumnSearchProps2('user_accept')
        },
        {
            title: 'SEARCH DATE',
            key: 'searchdate',
            width: '26%',
            align: 'center',
            ...getColumnSearchProps('searchdate'),
            children: [

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
        },
    ];

    const handleRefesh = () => {
        const AcceptedDevice = async () => {
            try {
                const response = await trackingAPI.getAll();
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        AcceptedDevice();
    }

    return (
        <>
            <Divider style={{ margin: "0" }} orientation="center">Devices Tracking</Divider>
            <Button size='middle' align="right" style={{ marginBottom: '5px' }} onClick={handleRefesh} icon={<RedoOutlined />} type='primary'>
                Refesh
            </Button>
            <Table bordered rowKey={'id'} size='middle' columns={columns} pagination={pagination} dataSource={data} />
        </>

    )
}

