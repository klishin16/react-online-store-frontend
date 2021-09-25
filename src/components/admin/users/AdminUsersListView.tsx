import React, {useEffect} from 'react';
import {Layout, Table, Tag} from "antd";
import AdminViewHeader, {IBreadcrumbRoute} from "../AdminViewHeader";
import {Content} from "antd/es/layout/layout";
import {IRole} from "../../../models/IRole";
import {Link, Route, useRouteMatch} from "react-router-dom";
import AdminUserDetailView from "./AdminUserDetailView";
import {IAdminViewProps} from "../types";
import useExtendedRequest from "../../../hooks/useExtendedRequest";
import {userTypedSelector} from "../../../hooks/userTypedSelector";
import {UserService} from "../../../API/UserService";
import {IUser} from "../../../models/IUser";
import {generateTableConfig} from "../../../functions/TablePropsBuilder";


interface IAdminUsersViewProps extends IAdminViewProps {}


const AdminUsersListView:React.FC<IAdminUsersViewProps> = ({breadcrumbPath}) => {
    const [users, loading, error, requestWrapper] = useExtendedRequest<undefined, IUser[]>();
    const {path, url} = useRouteMatch();

    const {token} = userTypedSelector(state => state.auth)

    useEffect(() => {
        requestWrapper(() => UserService.getAllUsers(token!))
    }, []);


    const columns = generateTableConfig([
        {
            title: 'id',
            render: (id: number) => <Link to={url + '/' + id}>{id}</Link>
        },
        {
            title: 'email'
        },
        {
            title: 'password'
        },
        {
            title: 'roles',
            render: (roles: IRole[]) => (
                <>
                    {roles.map((role: IRole) => {
                        let color = role.value.length > 5 ? 'geekblue' : 'green';
                        if (role.value === "ADMIN") {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={role.id}>
                                {role.value.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            )
        }
    ])

    const currentBreadcrumbPath: IBreadcrumbRoute[] = [
        ...breadcrumbPath,
        {
            path: '/users',
            breadcrumbName: 'Users'
        }
    ]


    return (
        <div>
            <Route exact path={path}>
                <Layout>
                    <AdminViewHeader
                        title={"Users"}
                        subTitle={"Display all app users"}
                        breadcrumbPath={currentBreadcrumbPath}
                    />

                    <Content style={{marginTop: '2.3vh', marginLeft: "1.6vw", marginRight: "1.6vw"}}>
                        <Table loading={loading} columns={columns} dataSource={users}/>
                    </Content>
                </Layout>
            </Route>
            <Route exact path={`${path}/:userId`}>
                <AdminUserDetailView breadcrumbPath={currentBreadcrumbPath} />
            </Route>
        </div>

    );
};

export default AdminUsersListView;
