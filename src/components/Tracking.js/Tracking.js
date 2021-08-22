import React, { useEffect, useState } from 'react'
import { Table, Tag, Space, Button, DatePicker, Divider } from 'antd';
import trackingAPI from '../../api/setup/trackingAPI';
import '../../assets/styles/index.css'
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import moment from 'moment';
export default function Tracking() {
    const [data, setData] = useState()
    const [date, setDate] = useState([])
    const today = moment(new Date()).format('YYYY-MM-DD')
    const pagination = {
        position: ["bottomcenter"],
        defaultPageSize: 10,
        pageSize: 7
    }
    const { RangePicker } = DatePicker;
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
                        style={{ width: 137.5 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 137.6 }}>
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
    const columns = [
        {
            title: 'ID ',
            dataIndex: 'id',
            key: 'id',
            width: '7%',
            align: 'center'
        },
        {
            title: 'DECIVE NAME ',
            dataIndex: 'devicename',
            key: 'devicename',
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
            title: 'USER NAME',
            dataIndex: 'username',
            key: 'username',
            width: '26%',
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
    useEffect(() => {
        const AcceptedDevice = async () => {
            try {
                const response = await trackingAPI.getAll();
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        AcceptedDevice();
    }, []);




    return (
        <>
            <Divider style={{ margin: "0" }} orientation="center">Devices Tracking</Divider>
            <Button size='middle' align="right" style={{ marginBottom: '5px' }} onClick={() => { document.location.reload(); }} icon={<RedoOutlined />} type='primary'>
                Refesh
            </Button>
            <Table bordered rowKey={'id'} size='middle' columns={columns} pagination={pagination} dataSource={data} />
        </>

    )
}

