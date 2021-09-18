import React from 'react';
import {Layout} from "antd";
import AdminViewHeader, {IBreadcrumbRoute} from "./AdminViewHeader";
import {useGetApi} from "../../hooks/useApi";
import {IUserFull} from "../../models/IUser";
import {useParams} from "react-router-dom";
import {IDevice} from "../../models/IDevice";

interface IAdminDeviceDetailViewProps {
    onClose: Function;
    breadcrumbPath: IBreadcrumbRoute[];
}

const AdminDeviceDetailView:React.FC<IAdminDeviceDetailViewProps> = ({breadcrumbPath, onClose}) => {
    const { deviceId } = useParams<{deviceId: string}>()

    const [device, loading, error] = useGetApi<IDevice>(`/devices/${deviceId}`, true)

    return (
        <Layout>
            <AdminViewHeader
                title={"Category"}
                subTitle={"Category detail info"}
                onBack={() => onClose(false)}
                breadcrumbPath={[
                    ...breadcrumbPath,
                    {path: deviceId.toString(), breadcrumbName: device ? device.name : 'Loading...'}
                ]}
            />
            DEVICE DETAIL {JSON.stringify(device)}
        </Layout>
    );
};

export default AdminDeviceDetailView;
