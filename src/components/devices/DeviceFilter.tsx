import React from 'react';
import styled from "styled-components";
import {Card} from "antd";


const DeviceFilterContainer = styled(Card)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 20px 0px;
`


const DeviceFilter = () => {
    return (
        <DeviceFilterContainer title={"Filter"}>

        </DeviceFilterContainer>
    );
};

export default DeviceFilter;
