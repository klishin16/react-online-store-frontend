import React from 'react';
import {Button, Checkbox, Form, Input, Row, Typography} from 'antd';
    import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {LoginDTO} from "../../models/IUser";
import {userTypedSelector} from "../../hooks/userTypedSelector";
import {useActions} from "../../hooks/useActions";
import {RouteNames} from "../../routes/routerPaths";


interface LoginFormData {
    email: string;
    password: string;
    remember: boolean
}

const LoginForm = () => {
    const {login} = useActions()

    const submit = (data: LoginFormData) => {
        console.log(data)
        const loginDto: LoginDTO = {
            email: data.email,
            password: data.password
        }
        login(loginDto, data.remember, RouteNames.ADMIN)
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
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
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

export default LoginForm;
