import React, {useState} from 'react';
import {Button, Layout, Menu, Row} from 'antd';
import {
    FileOutlined,
    GiftOutlined,
    MobileOutlined,
    PieChartOutlined,
    RollbackOutlined,
    SettingOutlined,
    TeamOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import AdminSettings from "../components/admin/AdminSettings";
import AdminUsersListView from "../components/admin/users/AdminUsersListView";
import StatisticView from "../components/admin/StatisticView";
import {useActions} from "../hooks/useActions";
import {Link, Route, useHistory, useRouteMatch} from "react-router-dom";
import {RouteNames} from "../routes/routerPaths";
import {IBreadcrumbRoute} from "../components/admin/AdminViewHeader";
import styled from "styled-components";
import AdminDevicesView from "../components/admin/devices/AdminDevicesView";
import AdminCategoriesView from "../components/admin/categories/AdminCategoriesView";
import AdminBrandsView from "../components/admin/brands/AdminBrandsView";
import {userTypedSelector} from "../hooks/userTypedSelector";
import Text from "antd/es/typography/Text";

const {Header, Footer, Sider} = Layout;

// const {SubMenu} = Menu;

export enum AdminViews {
    SETTINGS = "/settings",
    USERS = "/users",
    STATISTICS = "/statistics",
    DEVICES = "/devices",
    CATEGORIES = "/categories",
    BRANDS = "/brands",
    OTHER = "/other"
}

const AdminPageHeader = styled(Header)`
  z-index: 1;
  padding: 0;
  box-shadow: rgba(0, 21, 41, 0.12) 0 1px 4px 0
`

const ViewsWrapper = styled.div`
`

const currentBreadcrumbPath: IBreadcrumbRoute[] = [{
    path: '/admin',
    breadcrumbName: 'Admin'
}]

type menuItem = {
    title: string,
    icon: React.ReactNode,
    viewName: AdminViews
}

const menuItems: menuItem[] = [
    {
        title: 'Statistics',
        icon: <PieChartOutlined/>,
        viewName: AdminViews.STATISTICS
    },
    {
        title: "Users",
        icon: <TeamOutlined/>,
        viewName: AdminViews.USERS
    },
    {
        title: "Devices",
        icon: <GiftOutlined/>,
        viewName: AdminViews.DEVICES
    },
    {
        title: "Categories",
        icon: <UnorderedListOutlined/>,
        viewName: AdminViews.CATEGORIES
    },
    {
        title: "Brands",
        icon: <MobileOutlined />,
        viewName: AdminViews.BRANDS
    },
    {
        title: "Settings",
        icon: <SettingOutlined/>,
        viewName: AdminViews.SETTINGS
    },
    {
        title: "Files",
        icon: <FileOutlined/>,
        viewName: AdminViews.OTHER
    }
]


const AdminPage: React.FC = () => {

    const history = useHistory()
    const {logout} = useActions()
    let {path, url} = useRouteMatch();

    const {user} = userTypedSelector(state => state.auth)

    const [collapseSide, setCollapseSide] = useState(false)

    const onCollapse = (collapsed: boolean) => {
        setCollapseSide(collapsed)
    };


    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapseSide} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {menuItems.map((menuItem, index) =>
                        <Menu.Item key={index} icon={menuItem.icon}>
                            <Link to={url + menuItem.viewName}>{menuItem.title}</Link>
                        </Menu.Item>
                    )}
                    <Menu.Item key="11" icon={<RollbackOutlined/>} onClick={() => history.push(RouteNames.INDEX)}>
                        Back to shop
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout className="site-layout">
                <AdminPageHeader className="site-layout-background">
                    <Row style={{height: '100%'}} justify={"end"} align={"middle"}>
                        {user && <Text>{user.email}</Text>}
                        <Button style={{marginLeft: '1vw', marginRight: '1vw'}} danger ghost={true} onClick={logout}>Logout</Button>
                    </Row>
                </AdminPageHeader>

                <ViewsWrapper>
                    <Route exact path={path + AdminViews.STATISTICS}>
                        <StatisticView breadcrumbPath={currentBreadcrumbPath}/>
                    </Route>
                    <Route path={path + AdminViews.SETTINGS}>
                        <AdminSettings/>
                    </Route>
                    <Route path={path + AdminViews.USERS}>
                        <AdminUsersListView breadcrumbPath={currentBreadcrumbPath}/>
                    </Route>
                    <Route path={path + AdminViews.DEVICES}>
                        <AdminDevicesView breadcrumbPath={currentBreadcrumbPath}/>
                    </Route>
                    <Route path={path + AdminViews.CATEGORIES}>
                        <AdminCategoriesView breadcrumbPath={currentBreadcrumbPath}/>
                    </Route>
                    <Route path={path + AdminViews.BRANDS}>
                        <AdminBrandsView breadcrumbPath={currentBreadcrumbPath}/>
                    </Route>
                </ViewsWrapper>
                <Footer style={{textAlign: 'center'}}>©2021 Created by klishin16</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminPage;
