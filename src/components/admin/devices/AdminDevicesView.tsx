import React from 'react';
import {Button, Card, Layout, Row, Table} from "antd";
import AdminViewHeader, {IBreadcrumbRoute} from "../AdminViewHeader";
import {Content} from "antd/es/layout/layout";
import {IDevice} from "../../../models/IDevice";
import {IAdminViewProps} from "../types";
import {useGetApi} from "../../../hooks/useApi";
import {Link, Route, useRouteMatch} from "react-router-dom";
import AdminDeviceDetailView from "./AdminDeviceDetailView";
import {RedoOutlined} from "@ant-design/icons";
import {AppColors} from "../../../styles/colors";
import useModalForm from "../../../hooks/useModalForm";
import DeviceCreationForm, {DeviceCreationValues} from "./DeviceCreationForm";
import {generateTableConfig} from "../../../functions/TablePropsBuilder";


interface IAdminProductsViewProps extends IAdminViewProps {
}

const AdminDevicesView: React.FC<IAdminProductsViewProps> = ({breadcrumbPath}) => {
    const [devices, loading, error, refreshDevices] = useGetApi<IDevice[]>('/devices', true, )
    const { path, url } = useRouteMatch()

    const {showModal, ...deviceCreationFormProps} = useModalForm<DeviceCreationValues>("Create new device", '/devices', true)

    const columns = generateTableConfig([
        {
            title: 'id',
            render: (id: number) => <Link to={url + '/' + id}>{id}</Link>
        },
        {
            title: 'name'
        },
        {
            title: 'price'
        },
        {
            title: 'sale'
        }
    ])

    const currentBreadcrumbPath: IBreadcrumbRoute[] = [
        ...breadcrumbPath,
        {
            path: '/devices',
            breadcrumbName: 'Devices'
        }
    ]


    return (
        <div>
            <Route exact path={path}>
                <Layout>
                    <AdminViewHeader
                        title={"Devices"}
                        subTitle={"Display all app devices"}
                        breadcrumbPath={currentBreadcrumbPath}
                    />

                    <Content style={{marginTop: '2.3vh', marginLeft: "1.6vw", marginRight: "1.6vw"}}>
                        <Card size={"small"}>
                            <Row justify={"end"}>
                                <Button
                                    color={"blue"}
                                    icon={<RedoOutlined/>}
                                    loading={loading}
                                    onClick={() => refreshDevices()}
                                >Refresh</Button>
                                <Button onClick={() => showModal()} style={{
                                    color: AppColors.GREEN,
                                    borderColor: AppColors.GREEN,
                                    marginLeft: '.5vw'
                                }}>Create</Button>
                            </Row>
                        </Card>

                        <DeviceCreationForm {...deviceCreationFormProps} />

                        <Table loading={loading} columns={columns} dataSource={devices!}/>
                    </Content>
                </Layout>
            </Route>
            <Route exact path={`${path}/:deviceId`}>
                <AdminDeviceDetailView breadcrumbPath={currentBreadcrumbPath} />
            </Route>
        </div>

    );
};

export default AdminDevicesView;
