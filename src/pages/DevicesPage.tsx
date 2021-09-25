import React, {useEffect} from 'react';
import {Button, Card, Layout, Row, Spin} from "antd";
import DeviceCard from "../components/devices/DeviceCard";
import styled from "styled-components";
import {useActions} from "../hooks/useActions";
import {userTypedSelector} from "../hooks/userTypedSelector";
import Title from "antd/es/typography/Title";
import DeviceFilter from "../components/devices/DeviceFilter";


const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: 190px 1fr;
`

const DeviceCardsWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  @media(max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media(max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
`


const DevicesPage = () => {
    const {devices, isLoading, category} = userTypedSelector(state => state.devices)
    const {loadDevices, setCategory} = useActions()

    useEffect(() => {
        loadDevices()
    }, [category]) //TODO срочно переделать

    return (
        <Layout style={{marginTop: '3vh', background: '#fff'}}>
            <Spin spinning={isLoading}>
                {category &&
                <Card size={"small"} style={{marginBottom: '1vh'}}>
                    <Row justify={"space-between"}>
                        <Title style={{fontWeight: "lighter", marginBottom: '0'}} level={2}>Выбранная категория: <i>{category.name}</i></Title>
                        <Button onClick={() => setCategory(undefined)} danger>Reset</Button>
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
