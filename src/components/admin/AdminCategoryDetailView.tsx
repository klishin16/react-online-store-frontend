import React from 'react';
import {useGetApi} from "../../hooks/useApi";
import {useParams} from "react-router-dom";
import {Layout, message, Spin} from "antd";

import AdminViewHeader, {IBreadcrumbRoute} from "./AdminViewHeader";
import {ICategory} from "../../models/ICategory";
import CategoryInfoCard from "../CategoryInfoCard";


interface IAdminCategoryDetailViewProps {
    onClose: Function;
    breadcrumbPath: IBreadcrumbRoute[];
}


const AdminCategoryDetailView:React.FC<IAdminCategoryDetailViewProps> = ({onClose, breadcrumbPath}) => {
    const { categoryId } = useParams<{categoryId: string}>()
    const [category, loading, error] = useGetApi<ICategory>(`/categories/${categoryId}`, true)


    return (
        <Layout>
            {error.length > 0 && message.error(error.toString())}
            <AdminViewHeader
                title={"Category"}
                subTitle={"Category detail info"}
                onBack={() => onClose(false)}
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
