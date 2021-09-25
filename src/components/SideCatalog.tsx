import React, {useEffect, useState} from 'react';
import {Drawer, Menu, Skeleton} from "antd";
import useExtendedRequest from "../hooks/useExtendedRequest";
import CategoryService from "../API/CategoryService";
import {userTypedSelector} from "../hooks/userTypedSelector";
import {ICategory} from "../models/ICategory";
import {buildCategoriesTree, CategoriesTree, LeafCategoryMap} from "../functions/CategoryTree";
import styled from "styled-components";
import {useHistory} from 'react-router-dom';
import {useActions} from "../hooks/useActions";
import {RouteNames} from "../routes/routerPaths";


const CategoryMenuItem = styled(Menu.Item)`
  :hover {
    cursor: pointer;
    background: #FAFAFA;
  }
`

const CategorySubMenuItem = styled(Menu.SubMenu)`
  :hover {
    cursor: pointer;
    background: #FAFAFA;
  }
`


const renderHighCategory = (category: ICategory, leafCategoriesMap: LeafCategoryMap, onClick: (selectedCategory: ICategory) => void) => {
    if (leafCategoriesMap.has(category.id!)) {
        return (<CategorySubMenuItem key={category.id} title={category.name} onTitleClick={() => onClick(category)}>
            {renderLeafCategories(category, leafCategoriesMap, onClick)}
        </CategorySubMenuItem>)
    } else {
        return (<CategoryMenuItem key={category.id} onClick={() => onClick(category)}>{category.name}</CategoryMenuItem>)
    }
}

const renderLeafCategories = (highCategory: ICategory, leafCategoriesMap: LeafCategoryMap, onClick: (selectedCategory: ICategory) => void) => leafCategoriesMap.get(highCategory.id!)!.map(leafCategory => {
    if (leafCategoriesMap.has(leafCategory.id!)) {
        return <CategorySubMenuItem key={leafCategory.id} title={leafCategory.name} onTitleClick={() => onClick(leafCategory)}>
                {renderLeafCategories(leafCategory, leafCategoriesMap, onClick)}
        </CategorySubMenuItem>
    } else {
        return <CategoryMenuItem key={leafCategory.id} onClick={() => onClick(leafCategory)}>{leafCategory.name}</CategoryMenuItem>
    }
})


interface ICatalogSidebarProps {
    visible: boolean;
    onClose: () => void
}

const SideCatalog: React.FC<ICatalogSidebarProps> = ({visible, onClose}) => {
    const history = useHistory()
    const [categories, loading, error, requestWrapper] = useExtendedRequest<undefined, ICategory[]>()
    const { token } = userTypedSelector(state => state.auth)
    const { setCategory } = useActions()
    const [categoriesTree, setCategoriesTree] = useState<CategoriesTree>({
        highCategories: new Array<ICategory>(),
        leafCategories: new Map<number, ICategory[]>()
    });

    useEffect(() => {
        if (visible) requestWrapper(() => CategoryService.getAllCategories(token!))
    }, [visible])

    useEffect(() => {
        if (categories) setCategoriesTree(buildCategoriesTree(categories))
    }, [categories])

    function onCategorySelected(category: ICategory) {
        setCategory(category)
        onClose()
        history.push(RouteNames.DEVICES)
    }


    return (
        <div>
            <Drawer bodyStyle={{padding: '0px 7px'}} title="Categories" placement="left" onClose={onClose}
                    visible={visible}>

                {loading ? <Skeleton active/>
                    :
                    <Menu style={{borderRight: "none"}}>
                        {categoriesTree.highCategories.map(highCategory => renderHighCategory(highCategory, categoriesTree.leafCategories, onCategorySelected))}
                    </Menu>
                }

            </Drawer>
        </div>
    );
};

export default SideCatalog;
