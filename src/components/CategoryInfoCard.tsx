import React, {useEffect} from 'react';
import {Button, Card, Checkbox, Divider, Form, Layout, Row, Select, Tag, Typography} from "antd";
import {IRole} from "../models/IRole";
import {ICategory} from "../models/ICategory";
import useSelect from "../hooks/useSelect";
import ButtonWithConfirm from "./ButtonWithConfirm";
import {useDELETEApi} from "../hooks/useApi";
import {useHistory} from "react-router-dom";
import {OptionProps} from "antd/es/mentions";


interface ICategoryInfoProps {
    category: ICategory
}

const { Text } = Typography

const CategoryInfoCard:React.FC<ICategoryInfoProps> = ({category}) => {
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
        category.categoryId != null ? category.categoryId : "",
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

    return (
        <Layout>
            <Card style={{margin: '14px 16px'}}>
                <Row justify={"space-between"}>
                    <Text>CategoryID: </Text>
                    <Text>{category.id}</Text>
                </Row>
                <Divider />
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
                <Divider />
                <Row justify={"space-between"}>
                    <Text>Inner categories: </Text>
                    <Text>{category.innerCategories?.length}</Text>
                </Row>
                <Divider />
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
