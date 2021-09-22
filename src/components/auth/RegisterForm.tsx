import React from 'react';
import {Button, Form, Input, Row, Typography} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {LoginDTO} from "../../models/IUser";
import {userTypedSelector} from "../../hooks/userTypedSelector";


const RegisterForm = () => {
    // const {login} = useActions()

    const submit = (loginDTO: LoginDTO) => {
        // login(loginDTO, RouteNames.ADMIN)
    };

    const { isLoading, error } = userTypedSelector(state => state.auth)

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={submit}
        >
            {error && <Row><Typography.Text style={{color: 'red'}}>{error}</Typography.Text></Row>}
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
                    Log in
                </Button>
                Or <a href="">register now!</a>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
