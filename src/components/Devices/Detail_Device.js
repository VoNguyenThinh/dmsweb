import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Button, Descriptions, Badge, Tag, Divider, notification, Space } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import devicesAPI from '../../api/setup/devicesAPI'
import { Role } from '../../utils/FuntionConfig';
import * as CF from '../../constants/config'
import reqApi from '../../api/setup/reqApi'
export default function DetailDevice() {
    const { id } = useParams()
    const history = useHistory()
    const [data, setData] = useState({})
    const link = {
        Phone: 'https://dungtung.store/wp-content/uploads/2019/10/iPhone-11-pro-max-xanh-500x500.jpg',
        Tablet: 'https://mobi9.vn/wp-content/uploads/2021/05/ipad-pro-11-select-202104_oep8-6y_k84f-57_4y9y-lg.png',
        Laptop: 'http://product.hstatic.net/1000259254/product/macbook_pro_16-inch-silver-anh3_869ff39739e44f9d9eb7aa4e9095d554_grande.jpg',
    }
    useEffect(() => {
        const DeviceInfomation = async () => {
            try {
                const response = await devicesAPI.ViewDevice(id);
                setData(response.data)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        DeviceInfomation();
    }, [id])
    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Space>
                <Button type="primary" size="middle" style={{ background: 'green', border: "none" }} onClick={() => {
                    notification.close(key)
                    history.goBack()
                }}>
                    Go back
                </Button>
                <Button type="primary" size="middle" style={{ border: "1px solid red", background: 'red' }} onClick={() => {
                    notification.close(key)
                }}>
                    Cancel
                </Button>
            </Space>
        );
        notification.open({
            message: <b>Notification</b>,
            description: "Request devices success ! ",
            style: { marginTop: '30px' },
            btn,
            key
        });
    };
    const reqHandle = () => {
        const body = {
            id: id
        }
        const createReq = async () => {
            try {
                await reqApi.creatReq(body);
                openNotification()
            } catch (error) {
                notification.warning({
                    message: <b>Warning</b>,
                    description: "Nothing changes",
                    style: { marginTop: '30px' },

                });
                console.log('Failed to fetch: ', error);
            }
        }
        createReq();

    }

    const Action = () => {
        const role = Role()
        if (role === 'admin') {
            return (
                <Button type='primary' block size='large'>
                    <Link to={CF.PATH.EDITDEVICES + `/${id}`}>Update</Link>
                </Button>
            )
        } else {
            if (data.is_active) {
                return (
                    <Button onClick={() => { reqHandle() }} type='primary' block size='large'>Request</Button>
                )
            } else {
                return (
                    <Button disabled type='primary' block size='large'>Request</Button>
                )
            }

        }
    }
    const url = (ob, item) => {
        if (item in ob) {
            return ob[item]
        } else {
            return 'https://5.imimg.com/data5/PF/VJ/EN/SELLER-9295383/dell-desktop-computer-500x500.jpg'
        }
    }

    return (
        <div>
            <Row align="middle" style={{ height: '545px', background: '' }}>
                <Col align='middle' xs={2} sm={4} md={6} lg={8} xl={7} span={7}>
                    <Image
                        width={300}
                        src={url(link, data.device_type)}
                    />
                </Col>

                <Col align={'middle'} xs={20} sm={16} md={12} lg={8} xl={16} span={13}>
                    <Divider style={{ fontSize: '20px' }}>Device Infomation</Divider>
                    <Descriptions layout="vertical" bordered>
                        <Descriptions.Item span={2} label={<b>ID</b>}>{id}</Descriptions.Item>
                        <Descriptions.Item label={<b>Name</b>}>{data.device_name}</Descriptions.Item>
                        <Descriptions.Item label={<b>Staus</b>} span={2}>
                            {data.is_active ? <Badge status="success" text={<Tag color='green'>Available</Tag>} /> : <Badge status="error" text={<Tag color='red'>Unavailable</Tag>} />}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Type</b>}>{data.device_type}</Descriptions.Item>
                        <Descriptions.Item width='50%' label={<b>Description</b>}>
                            {data.decription}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Action</b>}>
                            {Action()}
                        </Descriptions.Item>

                    </Descriptions>
                </Col>
                {/* <Col align='middle' xs={2} sm={4} md={6} lg={8} xl={1} span={1}>
                </Col> */}
            </Row >
        </div>
    )
}
