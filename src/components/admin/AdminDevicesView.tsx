import React from 'react';
import {Layout, Table} from "antd";
import AdminViewHeader, {IBreadcrumbRoute} from "./AdminViewHeader";
import {Content} from "antd/es/layout/layout";
import {IDevice} from "../../models/IDevice";
import {IAdminViewProps} from "./types";
import {useGetApi} from "../../hooks/useApi";
import {Link, Route, useRouteMatch} from "react-router-dom";
import AdminCategoryDetailView from "./AdminCategoryDetailView";


interface IAdminProductsViewProps extends IAdminViewProps {
}

export type TableColumnProps = {
    title: string,
    dataIndex: string,
    key: string,
    render?: any
}
export type generateTableColumnProps = {
    title: string,
    render?: any
}

export function generateTableConfig(columnProps: generateTableColumnProps[]): TableColumnProps[] {
    return columnProps.map((columnTitle: generateTableColumnProps) => {
        return {
            title: columnTitle.title.length >= 2 ? columnTitle.title[0].toUpperCase() + columnTitle.title.slice(1) : columnTitle.title,
            dataIndex: columnTitle.title,
            key: columnTitle.title,
            render: columnTitle.render
        }
    })
}

const AdminDevicesView: React.FC<IAdminProductsViewProps> = ({breadcrumbPath}) => {
    const [devices, loading, error] = useGetApi<IDevice[]>('/devices')
    const { path, url } = useRouteMatch()

    const columns = generateTableConfig([
        {
            title: 'id',
            render: (id: number) => <Link to={url + '/' + id}>{id}</Link>
        },
        {
            title: 'name'
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
                        <Table loading={loading} columns={columns} dataSource={devices!}/>
                    </Content>
                </Layout>
            </Route>
            <Route exact path={`${path}/:deviceId`}>
                <AdminCategoryDetailView breadcrumbPath={currentBreadcrumbPath} onClose={() => { }}/>
            </Route>
        </div>

    );
};

export default AdminDevicesView;
