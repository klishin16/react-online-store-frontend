import React, {useEffect} from 'react';
import {Layout, Spin} from "antd";
import {useHistory, useParams} from "react-router-dom";

import AdminViewHeader from "../AdminViewHeader";
import {IUserFull} from "../../../models/IUser";
import UserInfoCard from "./UserInfoCard";
import {useGetApi} from "../../../hooks/useApi";
import {IAdminViewProps} from "../types";


interface IAdminUserDetailViewProps extends IAdminViewProps{ }


const AdminUserDetailView:React.FC<IAdminUserDetailViewProps> = ({breadcrumbPath}) => {
    const { userId } = useParams<{userId: string}>()
    const [user, loading, error, execute] = useGetApi<IUserFull>(`/users/${userId}`, true, false)
    const history = useHistory()

    useEffect(() => execute(), [userId])

    return (
        <Layout>
            <AdminViewHeader
                title={"User"}
                subTitle={"User detail info"}
                onBack={() => history.goBack()}
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
