import React from 'react';
import {Breadcrumb, Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";
import styled from "styled-components";
import AppHeader from "../components/AppHeader";


const ContentWrapper = styled.div`
      background: #fff;
    `

const IndexPage = () => {



    return (
        <Layout>
            <AppHeader />

            <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <ContentWrapper style={{padding: 24, minHeight: 380}}>
                    Content
                </ContentWrapper>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
};

export default IndexPage;
