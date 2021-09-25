import React from 'react';
import {Button, Image, Row, Typography} from "antd";
import {IDevice} from "../../models/IDevice";
import {BASE_BACKEND_URL} from "../../config/constants";
import {AppColors} from "../../styles/colors";
import styled from "styled-components";
import {useActions} from "../../hooks/useActions";
import {userTypedSelector} from "../../hooks/userTypedSelector";


interface IDeviceCardProps {
    device: IDevice
}

const DeviceCardContainer = styled.div`
  padding: 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 20px 0;
  //min-width: 90px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 6fr 1fr 1fr;
  align-items: center;
  justify-content: stretch;
`
const {Text} = Typography

const DeviceCard: React.FC<IDeviceCardProps> = ({device}) => {
    const {user, token} = userTypedSelector(state => state.auth)
    const {basket, isLoading} = userTypedSelector(state => state.basket)
    const {addDevice, loadBasket} = useActions()

    async function addDeviceToBasket(deviceId: number) {
        if (!basket) await loadBasket(user!, token!) //TODO
        addDevice(basket?.id!, deviceId)
    }

    return (
        <DeviceCardContainer>
            {/*<img style={{objectFit: "cover", width: '100%'}} alt="device image" src={BASE_BACKEND_URL + '/' + device.image}/>*/}
            <div>
                <Image
                    width={'100%'}
                    src={BASE_BACKEND_URL + '/' + device.image}
                />
            </div>
            <div>
                <Text style={{fontSize: '1.6rem', fontWeight: "lighter"}} >{device.name}</Text>
            </div>
            <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: '1.2rem', fontWeight: "lighter"}}>Бренд: </Text>
                <Text style={{fontSize: '1.2rem', fontWeight: "lighter"}}>{device.brand?.name}</Text>
            </div>
            <hr/>
            <Row justify={"space-between"}>
                <Button type={"primary"} style={{
                    background: AppColors.GREEN,
                    borderColor: AppColors.GREEN
                }}>{`Price: ${device.price} RUB`}</Button>

                <Button
                    onClick={() => addDeviceToBasket(device.id!)}
                    loading={isLoading}
                >Buy</Button>
            </Row>
        </DeviceCardContainer>

    );
};

export default DeviceCard;
