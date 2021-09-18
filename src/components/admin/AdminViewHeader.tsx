import React from 'react';
import {Breadcrumb, PageHeader, Typography, } from "antd";
import styled from "styled-components";
import { Link } from 'react-router-dom';

export interface IBreadcrumbRoute {
    path: string,
    breadcrumbName: string,
}

interface IAdminViewHeaderProps {
    title: string;
    subTitle: string
    onBack?: Function;
    breadcrumbPath?: IBreadcrumbRoute[]
}

const PageHeaderWrapper = styled.div`
  padding: 0 24px;
  background-color: #fff;
`


const AdminViewHeader: React.FC<IAdminViewHeaderProps> = ({title, subTitle, ...rest}) => {
    const routes = rest.breadcrumbPath
    console.log(routes)

    // const titleElem = <Typography.Title level={3} style={{}}>{title}</Typography.Title>

    return (
        <PageHeaderWrapper>
            <PageHeader
                className="site-page-header"
                // @ts-ignore
                onBack={rest.onBack ? () => rest.onBack() : undefined}
                breadcrumb={
                    <Breadcrumb>
                        {routes ?
                            routes.map((route, index) =>
                                <Breadcrumb.Item>
                                    <Link to={routes.slice(0, index + 1).reduce((accumulatedPath, route) => accumulatedPath + route.path, '')}>{route.breadcrumbName}</Link>
                                </Breadcrumb.Item>
                            )
                            :
                            <Typography.Text>Loading...</Typography.Text>

                        }
                    </Breadcrumb>
                }
                title={title}
                subTitle={subTitle}>

            </PageHeader>
        </PageHeaderWrapper>
    );
};

export default AdminViewHeader;
