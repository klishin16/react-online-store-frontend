import React from 'react';
import {Button, Card, Divider, Row} from "antd";
import {IDevice} from "../../models/IDevice";
import {BASE_BACKEND_URL} from "../../config/constants";
import {AppColors} from "../../styles/colors";
import Title from "antd/es/typography/Title";
import styled from "styled-components";


interface IDeviceCardProps {
    device: IDevice
}

const DeviceCardContainer = styled(Card)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 20px 0px;
  width: 100%;
  height: 100%;
  text-align: center;
`


const DeviceCard: React.FC<IDeviceCardProps> = ({device}) => {


    return (
        <DeviceCardContainer>
            <Row>
                <img style={{objectFit: "cover", width: '100%'}} alt="device image" src={BASE_BACKEND_URL + '/' + device.image}/>
            </Row>
            <Row>
                <Title level={3}>{device.name}</Title>
            </Row>
            <Row justify={"space-between"}>
                <Title level={5}>Бренд: </Title>
                <Title level={5}>{device.brandId}</Title>
            </Row>
            <hr/>
            <Row justify={"space-between"}>
                <Button  type={"primary"} style={{
                    background: AppColors.GREEN,
                    borderColor: AppColors.GREEN
                }}>{`Price: ${device.price} RUB`}</Button>

                <Button>Buy</Button>
            </Row>
        </DeviceCardContainer>

    );
};

export default DeviceCard;
