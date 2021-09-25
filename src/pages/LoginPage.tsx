import React, {useEffect} from 'react';
import LoginForm from "../components/auth/LoginForm";
import styled from "styled-components";
import {Card} from "antd";
import {useActions} from "../hooks/useActions"; //TODO удалить


const LoginPageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const LoginPage = () => {

    return (
        <LoginPageWrapper>
            <Card title="React-shop" style={{width: "300px", marginTop: "21vh"}} headStyle={{display: "flex", justifyContent: "center", fontSize: "1.6rem"}} bordered={true}>
                <LoginForm/>
            </Card>
        </LoginPageWrapper>
    );
};

export default LoginPage;
