import React, {useEffect, useState} from 'react';
import {Card, Col, Divider, Layout, Row, Typography} from "antd";
import {Content, Footer} from "antd/es/layout/layout";
import styled from "styled-components";
import AppHeader from "../components/AppHeader";
import Title from "antd/es/typography/Title";
import SideCatalog from "../components/SideCatalog";
import {Route, useRouteMatch} from "react-router-dom";
import {RouteNames} from "../routes/routerPaths";
import DevicesPage from "./DevicesPage";
import HeaderSearch from "../components/HeaderSearch";
import BasketPage from "./BasketPage";


const ContentWrapper = styled(Card)`
  background: #fff;
`

const CarouselItem = styled.div`
  //height: 160px;
  //color: #fff;
  //lineHeight: 160px;
  //textAlign: center;
  //background: #364d79;
`

const CategoriesCardsWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 200px;
`


const IndexPage = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    let {path} = useRouteMatch();

    const categoryCard =
        <Card title={"Category"} headStyle={{textAlign: 'center'}}>

        </Card>

    useEffect(() => {
        console.log(path)
    }, [path]);


    return (
        <Layout>
            <AppHeader/>

            <SideCatalog visible={sidebarVisible} onClose={() => setSidebarVisible(false)}/>

            <Content className="site-layout" style={{padding: '0 50px', marginTop: 64, background: '#fff'}}>
                <ContentWrapper style={{padding: 24, minHeight: 380}}>
                    <HeaderSearch sideBarToggle={setSidebarVisible}/>

                    <Route exact path={path}>

                        <Row style={{marginTop: '5vh'}}>
                            <Card style={{background: '#364d79', width: '100%', height: '34vh'}}>
                                <CarouselItem>

                                </CarouselItem>
                            </Card>
                        </Row>


                        <Row style={{marginTop: '3vh'}} justify={"start"}>
                            <Title style={{fontWeight: "lighter"}} level={2}>Популярные категории</Title>
                        </Row>
                        <Row>
                            <CategoriesCardsWrapper>
                                {categoryCard}
                                {categoryCard}
                                {categoryCard}
                                {categoryCard}
                                {categoryCard}
                            </CategoriesCardsWrapper>
                        </Row>

                        <Row style={{marginTop: '3vh'}} justify={"start"}>
                            <Divider/>
                            <Title style={{fontWeight: "lighter"}} level={2}>Контакты</Title>
                        </Row>
                        <Row>
                            <Col span={5}>
                                <ul style={{listStyle: "none"}}>
                                    <li>
                                        <Typography.Text style={{fontSize: '1rem'}}>Email:
                                            klishin.nd16@gmail.com</Typography.Text>
                                    </li>
                                    <li>
                                        <Typography.Text style={{fontSize: '1rem'}}>Git: @klishin16</Typography.Text>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Route>

                    <Route exact path={RouteNames.DEVICES}>
                        <DevicesPage/>
                    </Route>

                    <Route exact path={RouteNames.BASKET}>
                        <BasketPage />
                    </Route>
                </ContentWrapper>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2021 Created by @klishin16"</Footer>
        </Layout>
    );
};

export default IndexPage;
