import React, {useEffect} from 'react';
import {Button, Card, Layout, Row, Spin} from "antd";
import {useGetApi} from "../hooks/useApi";
import {IDevice} from "../models/IDevice";
import DeviceCard from "../components/devices/DeviceCard";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import {useActions} from "../hooks/useActions";
import {userTypedSelector} from "../hooks/userTypedSelector";
import Title from "antd/es/typography/Title";
import DeviceFilter from "../components/devices/DeviceFilter";


const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 6fr;
`

const DeviceCardsWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 340px);
`


const DevicesPage = () => {
    const {devices, isLoading, categoryId} = userTypedSelector(state => state.devices)
    const {loadDevices, setCategoryId} = useActions()
    const history = useHistory()

    useEffect(() => {
        loadDevices()
    }, [categoryId]) //TODO срочно переделать

    return (
        <Layout style={{marginTop: '3vh', background: '#fff'}}>
            <Spin spinning={isLoading}>
                {categoryId &&
                <Card size={"small"}>
                    <Row justify={"space-between"}>
                        <Title style={{fontWeight: "lighter", marginBottom: '0'}} level={2}>Category: {categoryId}</Title>
                        <Button onClick={() => setCategoryId(undefined)} danger>Reset</Button>
                    </Row>
                </Card>
                }
                <Container>
                    <DeviceFilter />

                    <DeviceCardsWrapper>
                        {devices && devices.map((device, index) =>
                            <DeviceCard key={index} device={device}/>
                        )}
                    </DeviceCardsWrapper>
                </Container>
            </Spin>
        </Layout>
    );
};

export default DevicesPage;
