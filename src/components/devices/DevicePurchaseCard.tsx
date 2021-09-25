import React from 'react';
import {IDevice} from "../../models/IDevice";
import styled from "styled-components";
import {Button, Image} from "antd";
import {BASE_BACKEND_URL} from "../../config/constants";
import {useActions} from "../../hooks/useActions";
import {userTypedSelector} from "../../hooks/userTypedSelector";


interface IDevicePurchaseProps {
    device: IDevice
}


const PurchaseCard = styled.div`
  padding: 24px;
  display: grid;
  column-gap: 3vw;
  grid-template-columns: 1fr 4fr;
  border: 1px solid #f0f0f0;
`

const PurchaseDescription = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr);
  align-items: center;
`

const DevicePurchaseCard:React.FC<IDevicePurchaseProps> = ({device}) => {
    const {basket} = userTypedSelector(state => state.basket)
    const {removeDevice} = useActions()

    return (
        <PurchaseCard>
            <Image
                width={'120px'}
                height={'160px'}
                src={BASE_BACKEND_URL + '/' + device.image}
            />
            <PurchaseDescription>
                <div style={{fontSize: '1.6rem', fontWeight: 'lighter'}}>{device.name}</div>

                <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                    <div style={{fontSize: '1.2rem', fontWeight: 'lighter'}}>
                        Price: {device.price} RUB
                    </div>
                    <Button
                        type={"primary"}
                        onClick={() => removeDevice(basket!.id!, device.id!)} // TODO
                    >Удалить из корзины</Button>
                </div>

            </PurchaseDescription>
        </PurchaseCard>
    );
};

export default DevicePurchaseCard;
