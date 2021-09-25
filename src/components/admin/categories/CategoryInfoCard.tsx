import React, {useEffect} from 'react';
import {Button, Card, Divider, Dropdown, Form, Input, Layout, Menu, message, Row, Select, Typography} from "antd";
import {ICategory} from "../../../models/ICategory";
import useSelect from "../../../hooks/useSelect";
import ButtonWithConfirm from "../../ButtonWithConfirm";
import {useHistory} from "react-router-dom";
import {DownOutlined, UnorderedListOutlined} from '@ant-design/icons';
import useExtendedRequest from "../../../hooks/useExtendedRequest";
import CategoryService from "../../../API/CategoryService";
import {userTypedSelector} from "../../../hooks/userTypedSelector";
import {useEditForm} from "../../../hooks/useEditForm";


interface ICategoryInfoProps {
    category: ICategory
}

const {Text} = Typography

const CategoryInfoCard: React.FC<ICategoryInfoProps> = ({category}) => {
    const history = useHistory()

    const { token } = userTypedSelector(state => state.auth)

    const selectParams = useSelect<ICategory>(
        '/categories',
        dataItem => {
            return {
                label: dataItem.name,
                value: dataItem.id!
            }
        },
        category.parentCategory
    )

    const {data, setData, edited} = useEditForm(category);

    const [updateResponse, updateLoading, updateError, updateRequestWrapper] = useExtendedRequest()
    const [removeResponse, removeLoading, removeError, removeRequestWrapper] = useExtendedRequest()

    function removeCategory() {
        removeRequestWrapper(() => CategoryService.deleteCategory(category.id!, token!))
    }

    function updateCategory() {
        const updateObj = editCategoryForm.getFieldsValue()
        console.log('Category update:', updateObj)
        updateRequestWrapper(
            () => CategoryService.updateCategory(category.id!, updateObj, token!), () => message.success("Updated!"))
    }

    useEffect(() => {
        if (removeResponse && !removeError) {
            history.goBack()
        }
    }, [removeResponse]);

    const [editCategoryForm] = Form.useForm();


    const menuItems = category.innerCategories?.map(innerCategory =>
        <Menu.Item key="1" icon={<UnorderedListOutlined/>}>
            <Text onClick={() => history.push(`/admin/categories/${innerCategory.id}`)}>{innerCategory.name}</Text>
        </Menu.Item>
    )

    return (
        <Layout>
            <Card style={{margin: '14px 16px'}}>
                <Form
                    form={editCategoryForm}
                    initialValues={data}
                    onValuesChange={(e) => console.log(e)}
                >
                    <Row>
                        <Form.Item name={'id'} label="CategoryID: ">
                            <Input disabled/>
                        </Form.Item>
                        <Divider/>
                        <Form.Item name={'name'} label="Category: ">
                            <Input />
                        </Form.Item>
                    </Row>
                    <Divider/>
                    <Row justify={"space-between"}>
                        <Form.Item name={'parentCategoryId'} label="Parent category: ">
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
                </Form>

                    <Divider/>

                    <Row justify={"end"}>
                        <Button
                            style={{color: "green", borderColor: "green", marginRight: '.7vw'}}
                            loading={updateLoading}
                            // disabled={!edited}
                            onClick={() => updateCategory()}
                        >
                            Update
                        </Button>

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
