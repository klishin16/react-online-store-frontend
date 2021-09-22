import React from 'react';
import {Form, Input, Modal, Select} from 'antd';
import useSelect from "../../../hooks/useSelect";
import {ICategory} from "../../../models/ICategory";


export interface CategoryCreationValues {
    name: string;
    categoryId: string;
}

interface ICategoryCreateFormProps {
    modalTitle: string;
    confirmLoading: boolean;
    visible: boolean
    onCreate: (values: CategoryCreationValues) => void;
    onCancel: () => void;
}


const CategoryCreationForm:React.FC<ICategoryCreateFormProps> = ({modalTitle, confirmLoading, visible, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    const selectParams = useSelect<ICategory[]>(
        '/categories',
        data => data.map(category => {
                return {
                    label: category.name,
                    value: category.id!
                }
            }
        ),
        -1
    )

    function onOk() {
        console.log("onOk")
        form.validateFields()
            .then(values => {
                form.resetFields();
                console.log(values)
                onCreate(values);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    return (
        <Modal
            visible={visible}
            title={modalTitle}
            okText="Create"
            cancelText="Cancel"
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            onOk={onOk}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Name"
                    name={"name"} required
                           tooltip="Select category name. This name will be represented on shop page.">
                    <Input placeholder={'Enter category name. Example: "Tools"'}/>
                </Form.Item>
                <Form.Item
                    label="Parent category"
                    name={"categoryId"}
                    required tooltip="Select parent category or set null to show in top of categories tree."
                >
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="Select a category"
                        {...selectParams}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CategoryCreationForm;
