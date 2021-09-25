import React from 'react';
import styled from "styled-components";
import RegisterForm from "../components/auth/RegisterForm";
import {Card} from "antd";


const RegisterPageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const RegisterPage = () => {
    return (
        <RegisterPageWrapper>
            <Card title="React-shop" style={{width: "300px", marginTop: "21vh"}} headStyle={{display: "flex", justifyContent: "center", fontSize: "1.6rem"}} bordered={true}>
            <RegisterForm />
            </Card>
        </RegisterPageWrapper>
    );
};

export default RegisterPage;
