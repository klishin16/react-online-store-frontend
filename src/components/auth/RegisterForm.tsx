import React from 'react';
import {Button, Form, Input, Row, Typography} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import useExtendedRequest from "../../hooks/useExtendedRequest";
import {UserService} from "../../API/UserService";
import {useActions} from "../../hooks/useActions";
import {RouteNames} from "../../routes/routerPaths";
import {Link} from 'react-router-dom';

interface RegisterFormData {
    email: string;
    password: string;
}

const RegisterForm = () => {
    const {login} = useActions()
    const [_, loading, registerError, registerRequestWrapper] = useExtendedRequest()

    const submit = (registerDTO: RegisterFormData) => {
        registerRequestWrapper(() => UserService.createUser(registerDTO.email, registerDTO.password), () => {
            login(registerDTO, true, RouteNames.INDEX)
        })

    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={submit}
        >
            {registerError && <Row><Typography.Text style={{color: 'red'}}>{registerError.toString()}</Typography.Text></Row>}
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
                <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                    Register
                </Button>
                Or <Link to={RouteNames.LOGIN}>login!</Link>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
