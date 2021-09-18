import React from 'react';
import {Button, Card, Checkbox, Divider, Form, Input, Layout, Row, Select, Typography,} from "antd";
import {IUserFull} from "../models/IUser";
import useSelect from "../hooks/useSelect";
import {ICategory} from "../models/ICategory";

interface IUserInfoProps {
    user: IUserFull
}

const {Text} = Typography
const {Option} = Select;

const UserInfoCard: React.FC<IUserInfoProps> = ({user}) => {


    return (
        <Layout>
            <Card style={{margin: '14px 16px'}}>
                <Row justify={"space-between"}>
                    <Form.Item label="Email: ">
                        <Input disabled value={user.email}/>
                    </Form.Item>
                    <Form.Item label="Password: ">
                        <Input value={user.password}/>
                    </Form.Item>
                </Row>
                <Divider/>
                <Row justify={"space-between"}>
                    <Form.Item label="Banned: ">
                        <Checkbox disabled checked={user.banned}/>
                    </Form.Item>
                    <Form.Item label="Ban reason: ">
                        <Input value={user.banReason ? user.banReason : 'Отсутствует'}/>
                    </Form.Item>
                </Row>
                <Divider/>
                <Row justify={"end"}>
                    <Button style={{color: "green", borderColor: "green", marginRight: '.7vw'}}>Save</Button>
                    <Button style={{color: "red", borderColor: "red"}}>Delete</Button>
                </Row>
            </Card>
        </Layout>
    );
};

export default UserInfoCard;
