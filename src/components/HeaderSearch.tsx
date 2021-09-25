import React from 'react';
import {Button} from "antd";
import {UnorderedListOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {useActions} from "../hooks/useActions";
import {userTypedSelector} from "../hooks/userTypedSelector";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes/routerPaths";


const HeaderSearchContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: 190px 6fr;
`


interface IHeaderSearchProps {
    sideBarToggle: (arg0: boolean) => void
}

const HeaderSearch: React.FC<IHeaderSearchProps> = ({sideBarToggle}) => {
    const history = useHistory()

    const {isLoading} = userTypedSelector(state => state.devices)
    const {setQuery, loadDevices} = useActions()

    function onSearch(searchQ: string) {
        console.log("Search query:", searchQ)
        setQuery(searchQ.toLowerCase())
        loadDevices()
        history.push(RouteNames.DEVICES)
    }

    return (
        <HeaderSearchContainer>
            <Button size={"large"} icon={<UnorderedListOutlined/>} onClick={() => sideBarToggle(true)}>Каталог
                товаров</Button>

            <Search
                onSearch={onSearch}
                placeholder="Поиск товаров"
                enterButton="Search"
                size="large"
                loading={isLoading}
            />
        </HeaderSearchContainer>
    );
};

export default HeaderSearch;
