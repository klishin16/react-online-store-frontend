import React, {useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {Layout, message, Spin} from "antd";

import AdminViewHeader from "../AdminViewHeader";
import {ICategory} from "../../../models/ICategory";
import CategoryInfoCard from "./CategoryInfoCard";
import {IAdminViewProps} from "../types";
import useExtendedRequest from "../../../hooks/useExtendedRequest";
import CategoryService from "../../../API/CategoryService";
import {userTypedSelector} from "../../../hooks/userTypedSelector";


interface IAdminCategoryDetailViewProps extends IAdminViewProps { }


const AdminCategoryDetailView:React.FC<IAdminCategoryDetailViewProps> = ({breadcrumbPath}) => {
    const { categoryId } = useParams<{categoryId: string}>()
    const [category, loading, error, requestWrapper] = useExtendedRequest<undefined, ICategory>()
    const { token } = userTypedSelector(state => state.auth)
    const history = useHistory()

    useEffect(() => requestWrapper(() => CategoryService.getCategory(Number(categoryId), token!)),
        [categoryId])

    return (
        <Layout>
            {error && message.error(error.toString())}
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
