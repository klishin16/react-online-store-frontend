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
    onBack?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    breadcrumbPath?: IBreadcrumbRoute[]
}

const PageHeaderWrapper = styled.div`
  padding: 0 24px;
  background-color: #fff;
`


const AdminViewHeader: React.FC<IAdminViewHeaderProps> = ({title, subTitle, ...rest}) => {
    const routes = rest.breadcrumbPath

    // const titleElem = <Typography.Title level={3} style={{}}>{title}</Typography.Title>

    return (
        <PageHeaderWrapper>
            <PageHeader
                className="site-page-header"
                onBack={rest.onBack}
                breadcrumb={
                    <Breadcrumb>
                        {routes ?
                            routes.map((route, index) =>
                                <Breadcrumb.Item key={index}>
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
