import React, {useEffect} from 'react';
import {useGetApi} from "../../../hooks/useApi";
import {useHistory, useParams} from "react-router-dom";
import {Layout, message, Spin} from "antd";

import AdminViewHeader from "../AdminViewHeader";
import {ICategory} from "../../../models/ICategory";
import CategoryInfoCard from "./CategoryInfoCard";
import {IAdminViewProps} from "../types";


interface IAdminCategoryDetailViewProps extends IAdminViewProps { }


const AdminCategoryDetailView:React.FC<IAdminCategoryDetailViewProps> = ({breadcrumbPath}) => {
    const { categoryId } = useParams<{categoryId: string}>()
    const [category, loading, error, execute] = useGetApi<ICategory>(`/categories/${categoryId}`, true, false)
    const history = useHistory()

    useEffect(() => execute(), [categoryId])

    return (
        <Layout>
            {error.length > 0 && message.error(error.toString())}
            <AdminViewHeader
                title={"Category"}
                subTitle={"Category detail info"}
                onBack={() => history.goBack()}
                breadcrumbPath={[
                    ...breadcrumbPath,
                    {path: categoryId.toString(), breadcrumbName: category ? category?.name : 'Loading...'}
                ]}
            />
            <Spin spinning={loading}>
                {category && <CategoryInfoCard category={category} />}
            </Spin>
        </Layout>

    );
};

export default AdminCategoryDetailView;
