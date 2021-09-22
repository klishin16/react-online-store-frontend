import React from 'react';
import styled from "styled-components";
import RegisterForm from "../components/auth/RegisterForm";


const RegisterPageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const RegisterPage = () => {
    return (
        <RegisterPageWrapper>
            <RegisterForm />
        </RegisterPageWrapper>
    );
};

export default RegisterPage;
