import React from 'react';
import {Card, Divider, Layout, Row, Switch, Typography} from "antd";
import {Themes} from "../../store/reducers/userSettings/types";
import {ThemeActionCreators} from "../../store/reducers/userSettings/action-creators";
import {useDispatch} from "react-redux";
import {userTypedSelector} from "../../hooks/userTypedSelector";

const AdminSettings = () => {

    const {theme} = userTypedSelector(state => state.them)
    const dispatch = useDispatch()
    const changeTheme = () => {
        if (theme === Themes.LIGHT) {
            dispatch(ThemeActionCreators.setTheme(Themes.DARK))
        } else {
            dispatch(ThemeActionCreators.setTheme(Themes.LIGHT))
        }
    }

    const {Text, Title} = Typography;

    return (
        <Layout>
            <Divider style={{borderColor: '#141414FF'}} orientation="left"><Title level={3}>Theme</Title></Divider>
            <Card style={{width: '100%'}}>
                <Row justify={"space-between"} align={"middle"}>
                    <Text style={{fontSize: '1.4rem'}}>Dark mode</Text>
                    <Switch checked={theme === Themes.DARK} onChange={changeTheme}/>
                </Row>
            </Card>

        </Layout>
    );
};

export default AdminSettings;
