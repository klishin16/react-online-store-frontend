import React from 'react';
import {Menu} from "antd";
import {RouteNames} from "../routes/routerPaths";
import styled from "styled-components";
import {Header} from "antd/es/layout/layout";
import {useHistory} from "react-router-dom";


const AppLogo = styled.div`
      float: left;
      width: 120px;
      height: 31px;
      margin: 16px 24px 16px 0;
      background: rgba(255, 255, 255, 0.2);
    `

const HeaderWrapper = styled.div`
      display: flex;
    `

const HeaderMenusWrapper = styled.div`
      width: 100%;
      display: flex;
      justify-content: space-between;
    `

const AppHeader = () => {

    const router = useHistory()


    return (
        <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
            <HeaderWrapper>
                <AppLogo/>
                <HeaderMenusWrapper>
                    <Menu style={{width: '300px'}} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                    <Menu style={{width: '200px'}} theme="dark" mode="horizontal">
                        <Menu.Item onClick={() => router.push(RouteNames.LOGIN)} key="4">Login</Menu.Item>
                        <Menu.Item onClick={() => router.push(RouteNames.ADMIN)} key="5">Admin</Menu.Item>
                    </Menu>
                </HeaderMenusWrapper>
            </HeaderWrapper>

        </Header>
    );
};

export default AppHeader;
