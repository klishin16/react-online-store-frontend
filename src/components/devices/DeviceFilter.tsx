import React, {useState} from 'react';
import styled from "styled-components";
import {Button, Card, InputNumber, Row, Slider, Typography} from "antd";
import {useActions} from "../../hooks/useActions";
import {userTypedSelector} from "../../hooks/userTypedSelector";


const DeviceFilterContainer = styled(Card)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 20px 0px;
  text-align: center;
  height: max-content;
`

const {Text, Title} = Typography

const minPriceRange = 0;
const maxPriceRange = 10000;

const DeviceFilter = () => {
    const {isLoading} = userTypedSelector(state => state.devices)
    const {setPriceRange, loadDevices} = useActions()

    const [localMinPrice, setLocalMinPrice] = useState(minPriceRange);
    const [localMaxPrice, setLocalMaxPrice] = useState(maxPriceRange);

    function apply(minPrice?: number, maxPrice?: number) {
        setPriceRange(minPrice, maxPrice)
        loadDevices()
    }

    return (
        <DeviceFilterContainer headStyle={{fontSize: '1.2rem', fontWeight: 'lighter', letterSpacing: '1px'}}
                               title={"Filter"}>
            <Row>
                <Title level={5}>Цена, RUB</Title>
            </Row>
            <Row justify={"space-between"}>
                <InputNumber
                    value={localMinPrice}
                    onChange={(value) => setLocalMinPrice(value)}
                    style={{maxWidth: "45%"}}
                    size={"middle"}
                />
                <div><span>-</span></div>
                <InputNumber
                    value={localMaxPrice} onChange={(value) => setLocalMaxPrice(value)}
                    style={{maxWidth: "45%"}}
                    size={"middle"}
                />
            </Row>
            <Row>
                <Slider
                    style={{width: '100%'}}
                    range
                    value={[
                        localMinPrice,
                        localMaxPrice
                    ]}
                    min={minPriceRange}
                    max={maxPriceRange}
                    onChange={value => {
                        setLocalMinPrice(value[0]);
                        setLocalMaxPrice(value[1])
                    }}
                />
            </Row>
            <Row style={{marginTop: '3vh'}}>
                <Button
                    loading={isLoading}
                    type={"primary"}
                    size={"large"}
                    style={{width: '100%'}}
                    onClick={() => apply(localMinPrice, localMaxPrice)}
                >Apply</Button>
            </Row>
        </DeviceFilterContainer>
    );
};

export default DeviceFilter;
