import React, {useEffect} from 'react';
import {Button, Card, Divider, Dropdown, Form, Layout, Menu, Row, Select, Typography} from "antd";
import {ICategory} from "../../../models/ICategory";
import useSelect from "../../../hooks/useSelect";
import ButtonWithConfirm from "../../ButtonWithConfirm";
import {useDELETEApi} from "../../../hooks/useApi";
import {useHistory} from "react-router-dom";
import {DownOutlined, UnorderedListOutlined} from '@ant-design/icons';


interface ICategoryInfoProps {
    category: ICategory
}

const {Text} = Typography

const CategoryInfoCard: React.FC<ICategoryInfoProps> = ({category}) => {
    const history = useHistory()
    const selectParams = useSelect<ICategory[]>(
        '/categories',
        data => data.map(category => {
                return {
                    label: category.name,
                    value: category.id!
                }
            }
        ),
        // category.categoryId != null ? {value: category.categoryId, label: category.categoryId.toString()} : {label: "Null", value: null}
        category.categoryId ? category.categoryId : -1,
    )

    const [removeResponse, removeLoading, error, execution] = useDELETEApi(`/categories/${category.id}`, true, false)

    function removeCategory() {
        execution()
    }

    useEffect(() => {
        if (removeResponse && !error) {
            history.goBack()
        }
    }, [removeResponse]);

    const menuItems = category.innerCategories?.map(innerCategory =>
        <Menu.Item key="1" icon={<UnorderedListOutlined/>}>
            <Text onClick={() => history.push(`/admin/categories/${innerCategory.id}`)}>{innerCategory.name}</Text>
        </Menu.Item>
    )

    return (
        <Layout>
            <Card style={{margin: '14px 16px'}}>
                <Row justify={"space-between"}>
                    <Text>CategoryID: </Text>
                    <Text>{category.id}</Text>
                </Row>
                <Divider/>
                <Row justify={"space-between"}>
                    <Text>Category: </Text>
                    <Text>{category.name}</Text>
                </Row>
                <Divider/>
                <Row justify={"space-between"}>
                    <Form.Item label="Parent category ID: ">
                        <Select
                            showSearch
                            style={{width: 200}}
                            placeholder="Select a category"
                            {...selectParams}
                        />
                    </Form.Item>
                </Row>
                <Divider/>
                <Row justify={"space-between"}>
                    <Text>Inner categories: </Text>

                    {category.innerCategories.length ?
                        <Dropdown overlay={<Menu>{menuItems}</Menu>}>
                            <Button>
                                Inner categories <DownOutlined/>
                            </Button>
                        </Dropdown>
                        :
                        <Text>Отсутствуют</Text>}
                </Row>

                <Divider/>

                <Row justify={"end"}>
                    <Button style={{color: "green", borderColor: "green", marginRight: '.7vw'}}>Save</Button>
                    <ButtonWithConfirm
                        title={"Удалить"}
                        onConfirm={removeCategory}
                        style={{color: "red", borderColor: "red"}}
                        popconfirmTitle={"Удалить? "}
                        loading={removeLoading}
                    >
                        Delete
                    </ButtonWithConfirm>
                </Row>
            </Card>
        </Layout>
    );
};

export default CategoryInfoCard;
