import React from 'react';
import {Form, Input, Modal} from 'antd';
import Text from "antd/es/typography/Text";


export interface BrandCreationValues {
    name: string;
    categoryId: string;
    price: number;
    brandId: string;
    availability: number;
    image: any
}

interface IBrandCreateFormProps {
    modalTitle: string;
    confirmLoading: boolean;
    visible: boolean
    onCreate: (values: BrandCreationValues) => void | string[];
    onCancel: () => void;
    errors: string[] | null;
}


const BrandCreationForm:React.FC<IBrandCreateFormProps> = ({modalTitle, confirmLoading, visible, onCreate, onCancel, errors}) => {
    const [form] = Form.useForm();

    function onOk() {
        console.log("onOk")
        form.validateFields()
            .then(values => {
                form.resetFields();
                console.log("From values:", values)
                console.log("nV:", values)
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
                           tooltip="Select Brand name. This name will be represented on shop page.">
                    <Input placeholder={'Enter Brand name. Example: "Tools"'}/>
                </Form.Item>
                <Form.Item
                    label="Description"
                    name={"description"} required
                    tooltip="Write brand description.">
                    <Input placeholder={'Description...'}/>
                </Form.Item>
            </Form>
            <div>
                {errors && errors.map((error, index) => <div key={index}><Text style={{color: "red"}}>{error}</Text></div>)}
            </div>
        </Modal>
    );
};

export default BrandCreationForm;
