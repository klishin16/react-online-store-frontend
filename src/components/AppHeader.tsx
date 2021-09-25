import React from 'react';
import {Badge, Button, Card, Menu} from "antd";
import {RouteNames} from "../routes/routerPaths";
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import {userTypedSelector} from "../hooks/userTypedSelector";
import {LoginOutlined} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import {useActions} from "../hooks/useActions";


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

const HeaderLinksWrapper = styled.div`
      width: 100%;
      display: flex;
      justify-content: space-between;
    `

const AppHeader = () => {
    const {logout} = useActions()

    const router = useHistory()

    const { isAuth, user } = userTypedSelector(state => state.auth)
    const { basket } = userTypedSelector(state => state.basket)

    const authLinks = isAuth ?
        <>
            <Button type={"link"} onClick={() => router.push(RouteNames.PROFILE)} key="5">{user ? user.email : 'Loading...'}</Button>
            <Badge count={basket ? basket.devices.length : 0}>
                <Button type={"link"} onClick={() => router.push(RouteNames.BASKET)} key="6">Basket</Button>
            </Badge>
            {user && user.roles.map(role => role.value).includes("ADMIN") && <Button type={"link"} onClick={() => router.push(RouteNames.ADMIN)} key="6">Admin</Button>}
            <Button type={"link"} onClick={() => logout()} key="7">Logout</Button>

        </>
        :
        <>
            <Button type={"link"} icon={<LoginOutlined />} onClick={() => router.push(RouteNames.LOGIN)} key="5">Login</Button>
            <Button type={"link"} onClick={() => router.push(RouteNames.REGISTRATION)} key="6">Registration</Button>
        </>

    return (
        <Card type={"inner"} style={{position: 'fixed', zIndex: 1, width: '100%'}}>
            <HeaderWrapper>
                {/*<AppLogo/>*/}
                <HeaderLinksWrapper>
                    <div style={{padding: '0 50px', display: "flex"}}>
                        <Link to={RouteNames.INDEX}><Title level={3} style={{marginBottom: 0}}>REACT SHOP</Title></Link>
                        <Link to={RouteNames.DEVICES}>Devices</Link>
                    </div>
                    <div style={{display: 'flex'}} >
                        {authLinks}
                    </div>
                </HeaderLinksWrapper>
            </HeaderWrapper>

        </Card>
    );
};

export default AppHeader;
