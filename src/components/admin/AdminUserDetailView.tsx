import React from 'react';
import {Layout, Spin} from "antd";
import {useParams} from "react-router-dom";

import AdminViewHeader, {IBreadcrumbRoute} from "./AdminViewHeader";
import {IUserFull} from "../../models/IUser";
import UserInfoCard from "../UserInfoCard";
import {useGetApi} from "../../hooks/useApi";


interface IAdminUserDetailViewProps {
    onClose: Function
    breadcrumbPath: IBreadcrumbRoute[]
}


const AdminUserDetailView:React.FC<IAdminUserDetailViewProps> = ({onClose, breadcrumbPath}) => {
    const { userId } = useParams<{userId: string}>()

    const [user, loading, error] = useGetApi<IUserFull>(`/users/${userId}`, true)


    return (
        <Layout>
            <AdminViewHeader
                title={"User"}
                subTitle={"User detail info"}
                onBack={() => onClose(false)}
                breadcrumbPath={[
                    ...breadcrumbPath,
                    {path: '/' + userId, breadcrumbName: user ? user.email : 'Loading...'}
                ]}
            />
            <Spin spinning={loading}>
                {user && <UserInfoCard user={user} />}
            </Spin>
        </Layout>

    );
};

export default AdminUserDetailView;
