import React, {useEffect} from 'react';
import {Button, Card, Layout, message, Row, Table} from "antd";
import AdminViewHeader, {IBreadcrumbRoute} from "../AdminViewHeader";
import {Content} from "antd/es/layout/layout";
import {IAdminViewProps} from "../types";
import {Link, Route, useRouteMatch} from "react-router-dom";
import {RedoOutlined} from "@ant-design/icons";
import {AppColors} from "../../../styles/colors";
import useModalForm from "../../../hooks/useModalForm";
import BrandCreationForm, {BrandCreationValues} from "./BrandCreationForm";
import AdminBrandDetailView from "./AdminBrandsDetailView";
import useExtendedRequest from "../../../hooks/useExtendedRequest";
import {BrandService} from "../../../API/BrandService";
import {IBrand} from "../../../models/IBrand";
import {generateTableConfig} from "../../../functions/TablePropsBuilder";


interface IAdminBrandsViewProps extends IAdminViewProps { }


const AdminBrandsView: React.FC<IAdminBrandsViewProps> = ({breadcrumbPath}) => {
    const [brands, loading, error, requestWrapper] = useExtendedRequest<undefined, IBrand[]>()
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

    useEffect(() => {
        if (error) message.error(error)
    }, [error])

    function refreshBrands() {
        requestWrapper(() => BrandService.getAllBrands(), () => message.success('Loaded!'))
    }

    useEffect(() => {
        refreshBrands()
    }, [])


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
