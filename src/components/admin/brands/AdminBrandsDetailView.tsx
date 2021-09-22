import React from 'react';
import {Layout, Spin} from "antd";
import AdminViewHeader from "../AdminViewHeader";
import {useGetApi} from "../../../hooks/useApi";
import {useHistory, useParams} from "react-router-dom";
import {IBrand} from "../../../models/IBrand";
import {IAdminViewProps} from "../types";
import BrandInfoCard from "./BrandInfoCard";

interface IAdminBrandDetailViewProps extends IAdminViewProps { }

const AdminBrandDetailView:React.FC<IAdminBrandDetailViewProps> = ({breadcrumbPath}) => {
    const { brandId } = useParams<{brandId: string}>()
    const [brand, loading, error] = useGetApi<IBrand>(`/brands/${brandId}`, true)
    const history = useHistory()

    return (
        <Layout>
            <AdminViewHeader
                title={"Brand"}
                subTitle={"Brand detail info"}
                onBack={() => history.goBack()}
                breadcrumbPath={[
                    ...breadcrumbPath,
                    {path: brandId, breadcrumbName: brand ? brand.name : 'Loading...'}
                ]}
            />

            <Spin spinning={loading}>
                {brand && <BrandInfoCard brand={brand} />}
            </Spin>
        </Layout>
    );
};

export default AdminBrandDetailView;
