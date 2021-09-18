import React from 'react';
import {IAdminViewProps} from "./types";
import AdminViewHeader, {IBreadcrumbRoute} from "./AdminViewHeader";
import {Button, Card, Layout, Row, Table, Typography} from "antd";
import {Content} from "antd/es/layout/layout";
import {generateTableConfig} from "./AdminDevicesView";
import {ICategory} from "../../models/ICategory";
import {useGetApi} from "../../hooks/useApi";
import {Link, Route, useRouteMatch} from "react-router-dom";
import {RedoOutlined} from '@ant-design/icons';
import AdminCategoryDetailView from "./AdminCategoryDetailView";
import {AppColors} from "../../styles/colors";
import ModalFormWrapper from "../ModalFormWrapper";
import CategoryCreationForm, {CategoryCreationValues} from "./CategoryCreationForm";
import useModalForm from "../../hooks/useModalForm";


interface IAdminCategoriesViewProps extends IAdminViewProps {
}

const AdminCategoriesView: React.FC<IAdminViewProps> = ({breadcrumbPath}) => {
    const [categories, loading, error, refreshCategories] = useGetApi<ICategory[]>('/categories')
    const {path, url} = useRouteMatch()

    const {showModal, ...categoryCreationFormProps} = useModalForm<CategoryCreationValues>("Create new category", '/categories')

    const columns = generateTableConfig([
        {
            title: 'id',
            render: (id: number) => <Link to={url + '/' + id}>{id}</Link>
        },
        {
            title: 'name',
            render: (name: string) => <a>{name}</a>
        },
        {
            title: 'categoryId',
            render: (categoryId: number | null) =>
                <Typography.Text>{categoryId ? categoryId : 'Отсутствует'}</Typography.Text>
        }
    ])

    const currentBreadcrumbPath: IBreadcrumbRoute[] = [
        ...breadcrumbPath,
        {
            path: '/categories',
            breadcrumbName: 'Categories'
        }
    ]


    return (
        <div>
            {error && <div>error</div>}
            <Route exact path={path}>
                <Layout>
                    <AdminViewHeader
                        title={"Categories"}
                        subTitle={"Display all app categories"}
                        breadcrumbPath={currentBreadcrumbPath}
                    />

                    <Content style={{marginTop: '2.3vh', marginLeft: "1.6vw", marginRight: "1.6vw"}}>
                        <Card size={"small"}>
                            <Row justify={"end"}>
                                <Button
                                    color={"blue"}
                                    icon={<RedoOutlined/>}
                                    loading={loading}
                                    onClick={() => refreshCategories()}
                                >Refresh</Button>
                                <Button onClick={() => showModal()} style={{
                                    color: AppColors.GREEN,
                                    borderColor: AppColors.GREEN,
                                    marginLeft: '.5vw'
                                }}>Create</Button>
                            </Row>
                        </Card>

                        <CategoryCreationForm {...categoryCreationFormProps} />

                        <Table loading={loading} columns={columns} dataSource={categories!}/>
                    </Content>
                </Layout>
            </Route>
            <Route exact path={`${path}/:categoryId`}>
                <AdminCategoryDetailView breadcrumbPath={currentBreadcrumbPath} onClose={() => {
                }}/>
            </Route>
        </div>


    );
};

export default AdminCategoriesView;
