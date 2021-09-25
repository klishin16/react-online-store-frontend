import React, {useEffect} from 'react';
import {Button, Card, Divider, Layout, Row, Spin} from "antd";
import styled from "styled-components";
import Title from 'antd/lib/typography/Title';
import useExtendedRequest from "../hooks/useExtendedRequest";
import {ICategory} from "../models/ICategory";
import {IBasket} from "../models/IBasket";
import CategoryService from "../API/CategoryService";
import {BasketService} from "../API/BasketService";
import {userTypedSelector} from "../hooks/userTypedSelector";
import DevicePurchaseCard from "../components/devices/DevicePurchaseCard";
import {useActions} from "../hooks/useActions";

interface IBasketPageProps {

}

const BasketContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  background: white;
`

const TotalCard = styled.div`
  text-align: center;
  padding: 14px;
  background: white;
  height: min-content;
  display: grid;
  grid-template-rows: repeat(1fr);
  justify-content: center;
  font-size: 1.6rem;
  font-weight: lighter;
  border: 1px solid #f0f0f0;
`

const PurchasesCardWrapper = styled(Card)`
  
`

const BasketPage:React.FC<IBasketPageProps> = () => {
    const { token, user } = userTypedSelector(state => state.auth)
    const { basket, totalSum, isLoading } = userTypedSelector(state => state.basket)
    const {loadBasket, setTotalSum} = useActions()


    useEffect(() => {
        loadBasket(user!, token!)

    }, []) //TODO

    useEffect(() => {
        if(basket) setTotalSum(basket.devices.reduce((acc, device) => acc + device.price, 0))
    }, [basket]);



    return (
        <Layout style={{marginTop: '3vh'}}>
            <Spin spinning={isLoading}>
                <BasketContentWrapper>
                    <PurchasesCardWrapper>
                        <Row>
                            <Title style={{fontWeight: 'lighter'}}>Товары:</Title>
                            <Divider />
                        </Row>
                        {basket && basket.devices.map((device, index) => <DevicePurchaseCard key={index} device={device} />)}
                    </PurchasesCardWrapper>

                    <TotalCard>
                        <div>Total</div>
                        <div style={{fontSize: '1.2rem'}}>
                            Общая стоймость: {totalSum}
                            <Divider />
                        </div>
                        <Button style={{width: '90%'}} size={"large"} type={"primary"}>Оформить</Button>
                    </TotalCard>
                </BasketContentWrapper>
            </Spin>
        </Layout>
    );
};

export default BasketPage;
