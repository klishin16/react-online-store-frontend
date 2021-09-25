import React, {useEffect} from 'react';
import {Card, Checkbox, Divider, Form, Input, Layout, Row,} from "antd";
import {IUserFull} from "../../../models/IUser";
import useExtendedRequest from "../../../hooks/useExtendedRequest";
import {UserService} from "../../../API/UserService";
import {userTypedSelector} from "../../../hooks/userTypedSelector";
import {useHistory} from "react-router-dom";
import ButtonWithConfirm from "../../ButtonWithConfirm";

interface IUserInfoProps {
    user: IUserFull
}


const UserInfoCard: React.FC<IUserInfoProps> = ({user}) => {
    const history = useHistory()

    const [removeResponse, removeLoading, removeError, removeRequestWrapper] = useExtendedRequest()
    const { token } = userTypedSelector(state => state.auth)

    function removeUser() {
        removeRequestWrapper(() => UserService.deleteUser(user.id!, token!))
    }

    useEffect(() => {
        if (removeResponse && !removeError) {
            history.goBack()
        }
    }, [removeResponse, removeError, history]);


    return (
        <Layout>
            <Card style={{margin: '14px 16px'}}>
                <Row justify={"space-between"}>
                    <Form.Item label="Email: ">
                        <Input disabled value={user.email}/>
                    </Form.Item>
                    <Form.Item label="Password: ">
                        <Input disabled value={user.password}/>
                    </Form.Item>
                </Row>
                <Divider/>
                <Row justify={"space-between"}>
                    <Form.Item label="Banned: ">
                        <Checkbox disabled checked={user.banned}/>
                    </Form.Item>
                    <Form.Item label="Ban reason: ">
                        <Input disabled value={user.banReason ? user.banReason : 'Отсутствует'}/>
                    </Form.Item>
                </Row>
                <Divider/>
                <Row justify={"end"}>
                    <ButtonWithConfirm
                        title={"Удалить"}
                        onConfirm={removeUser}
                        style={{color: "red", borderColor: "red"}}
                        popconfirmTitle={"Удалить? "}
                        loading={removeLoading}
                    >
                        Delete
                    </ButtonWithConfirm>
                </Row>
            </Card>
        </Layout>
    );
};

export default UserInfoCard;
