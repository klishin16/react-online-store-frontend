import React from 'react';
import {Layout, Spin} from "antd";
import AdminViewHeader from "../AdminViewHeader";
import {useGetApi} from "../../../hooks/useApi";
import {useHistory, useParams} from "react-router-dom";
import {IDevice} from "../../../models/IDevice";
import {IAdminViewProps} from "../types";
import DeviceInfoCard from "./DeviceInfoCard";

interface IAdminDeviceDetailViewProps extends IAdminViewProps { }

const AdminDeviceDetailView:React.FC<IAdminDeviceDetailViewProps> = ({breadcrumbPath}) => {
    const { deviceId } = useParams<{deviceId: string}>()
    const [device, loading, error] = useGetApi<IDevice>(`/devices/${deviceId}`, true)
    const history = useHistory()

    return (
        <Layout>
            <AdminViewHeader
                title={"Device"}
                subTitle={"Device detail info"}
                onBack={() => history.goBack()}
                breadcrumbPath={[
                    ...breadcrumbPath,
                    {path: deviceId.toString(), breadcrumbName: device ? device.name : 'Loading...'}
                ]}
            />

            <Spin spinning={loading}>
                {device && <DeviceInfoCard device={device} />}
            </Spin>
        </Layout>
    );
};

export default AdminDeviceDetailView;
