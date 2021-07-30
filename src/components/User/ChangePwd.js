import React, { useState } from 'react'
import { Form, Input, Button, Divider, Row, Col, notification } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import * as CF from '../../constants/config';
import userAPI from '../../api/setup/usersApi'

export default function Resetpwd() {
    const [old_pwd, setOld_pwd] = useState('a')
    const [new_pwd, setNew_pwd] = useState('')
    const [confirm_pwd, setConfirm_pwd] = useState('')
    const ChangePWD = () => {
        const body = {
            old_password: old_pwd,
            new_password: new_pwd
        }
        if (new_pwd === confirm_pwd) {
            const changepwd = async () => {
                try {
                    await userAPI.changePwd(body)
                    notification.success({
                        message: <b>Sucess </b>,
                        description: 'Change password success!!',
                        style: { marginTop: '30px' }
                    })


                } catch (error) {
                    notification.error({
                        message: <b>Error </b>,
                        description: 'Password incorrect!',
                        style: { top: "30px" }
                    })
                    console.log('Failed to post: ', error);
                }
            }
            changepwd();

        } else {
            notification.error({
                message: <b>Error </b>,
                description: 'Please make sure you passwords match!',
                style: { marginTop: '30px' }
            })
        }


    }

    return (
        <Row align="middle" style={{ height: '545px', background: '#f0f2f5' }}>
            <Col xs={2} sm={4} md={6} lg={8} xl={7} span={7}>
            </Col>

            <Col
                xs={20} sm={16} md={12} lg={8} xl={10} span={6}>

                <Divider plain><b>CHANGE PASSWORD</b></Divider>
                <Form
                    name="basic"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 19 }}
                    onFinish={ChangePWD}
                >
                    <Form.Item
                        label="Old password"
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your old password!' },
                            { min: 5, message: 'Minimum 5 characters.' }
                        ]}
                    >
                        <Input.Password onChange={(e) => { setOld_pwd(e.target.value) }} />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your new password!' },
                        { min: 5, message: 'Minimum 5 characters.' }]}
                    >
                        <Input.Password value={new_pwd} onChange={(e) => {
                            setNew_pwd(e.target.value)
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="con-password"
                        rules={[
                            { required: true, message: 'Please input confirm new password!' },
                            { min: 5, message: 'Minimum 5 characters.' }]}
                    >
                        <Input.Password value={confirm_pwd} onChange={(e) => {
                            setConfirm_pwd(e.target.value)
                        }} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 7, span: 19 }}>
                        <Button shape='round' block size='large' type="primary" htmlType="submit" icon={<SaveOutlined />}>
                            Save change
                        </Button>
                        <Button shape='round' block size='large' type="link" htmlType="button" >
                            <Link to={CF.PATH.PROFILE}>Return profile</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </Col>

            <Col xs={2} sm={4} md={6} lg={8} xl={7} span={9}>
            </Col>
        </Row >
    )
}
