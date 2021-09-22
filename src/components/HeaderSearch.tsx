import React from 'react';
import {Button, Col, Row} from "antd";
import {UnorderedListOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {useActions} from "../hooks/useActions";
import {userTypedSelector} from "../hooks/userTypedSelector";
import styled from "styled-components";


const HeaderSearchContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 6fr;
`


interface IHeaderSearchProps {
    sideBarToggle: (arg0: boolean) => void
}

const HeaderSearch: React.FC<IHeaderSearchProps> = ({sideBarToggle}) => {
    const {isLoading} = userTypedSelector(state => state.devices)
    const {setQuery, loadDevices} = useActions()

    function onSearch(searchQ: string) {
        console.log("Search query:", searchQ)
        setQuery(searchQ)
        loadDevices()
    }

    return (
        <HeaderSearchContainer>
            <Button size={"large"} icon={<UnorderedListOutlined/>} onClick={() => sideBarToggle(true)}>Каталог
                товаров</Button>

            <Search onSearch={onSearch} placeholder="Поиск товаров" enterButton="Search" size="large"
                    loading={isLoading}/>
        </HeaderSearchContainer>
    );
};

export default HeaderSearch;
