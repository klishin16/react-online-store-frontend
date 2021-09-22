import React from 'react';
import {Button, Card, Layout, Row, Table} from "antd";
import AdminViewHeader, {IBreadcrumbRoute} from "../AdminViewHeader";
import {Content} from "antd/es/layout/layout";
import {IAdminViewProps} from "../types";
import {useGetApi} from "../../../hooks/useApi";
import {Link, Route, useRouteMatch} from "react-router-dom";
import {RedoOutlined} from "@ant-design/icons";
import {AppColors} from "../../../styles/colors";
import useModalForm from "../../../hooks/useModalForm";
import {IBrand} from "../../../models/IBrand";
import BrandCreationForm, {BrandCreationValues} from "./BrandCreationForm";
import AdminBrandDetailView from "./AdminBrandsDetailView";


interface IAdminBrandsViewProps extends IAdminViewProps {
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

const AdminBrandsView: React.FC<IAdminBrandsViewProps> = ({breadcrumbPath}) => {
    const [brands, loading, error, refreshBrands] = useGetApi<IBrand[]>('/brands', true,)
    const {path, url} = useRouteMatch()

    const {showModal, ...deviceCreationFormProps} = useModalForm<BrandCreationValues>("Create new brand", '/brands')

    const columns = generateTableConfig([
        {
            title: 'id',
            render: (id: number) => <Link to={url + '/' + id}>{id}</Link>
        },
        {
            title: 'name'
        },
        {
            title: 'description'
        }
    ])

    const currentBreadcrumbPath: IBreadcrumbRoute[] = [
        ...breadcrumbPath,
        {
            path: '/brands',
            breadcrumbName: 'Brands'
        }
    ]


    return (
        <div>
            <Route exact path={path}>
                <Layout>
                    <AdminViewHeader
                        title={"Brands"}
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
                                    onClick={() => refreshBrands()}
                                >Refresh</Button>
                                <Button onClick={() => showModal()} style={{
                                    color: AppColors.GREEN,
                                    borderColor: AppColors.GREEN,
                                    marginLeft: '.5vw'
                                }}>Create</Button>
                            </Row>
                        </Card>

                        <BrandCreationForm {...deviceCreationFormProps} />

                        <Table loading={loading} columns={columns} dataSource={brands!}/>
                    </Content>
                </Layout>
            </Route>
            <Route exact path={`${path}/:brandId`}>
                <AdminBrandDetailView breadcrumbPath={currentBreadcrumbPath}/>
            </Route>
        </div>

    );
};

export default AdminBrandsView;
