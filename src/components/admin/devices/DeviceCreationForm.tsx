import React from 'react';
import {Button, Form, Input, InputNumber, Modal, Select, Upload} from 'antd';
import useSelect from "../../../hooks/useSelect";
import {UploadOutlined} from '@ant-design/icons'
import useUpload from "../../../hooks/useUpload";
import Text from "antd/es/typography/Text";
import {ICategory} from "../../../models/ICategory";
import {IBrand} from "../../../models/IBrand";


export interface DeviceCreationValues {
    name: string;
    categoryId: string;
    price: number;
    brandId: string;
    availability: number;
    image: any
}

interface IDeviceCreateFormProps {
    modalTitle: string;
    confirmLoading: boolean;
    visible: boolean
    onCreate: (values: DeviceCreationValues) => void | string[];
    onCancel: () => void;
    errors: string[] | null;
}


const DeviceCreationForm:React.FC<IDeviceCreateFormProps> = ({modalTitle, confirmLoading, visible, onCreate, onCancel, errors}) => {
    const [form] = Form.useForm();
    const selectParams = useSelect<ICategory>(
        '/categories',
        data => {
                return {
                    label: data.name,
                    value: data.id!
                }
            }
        )

    const brandSelectParams = useSelect<IBrand>(
        '/brands',
        data => {
                return {
                    label: data.name,
                    value: data.id!
                }
            }
    )

    function onOk() {
        console.log("onOk")
        form.validateFields()
            .then(values => {
                form.resetFields();
                console.log("From values:", values)
                const nV = {...values, image: values.image[0].originFileObj}
                console.log("nV:", nV)
                onCreate(nV);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    const {files, ...uploadProps} = useUpload()



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
                           tooltip="Select Device name. This name will be represented on shop page.">
                    <Input placeholder={'Enter Device name. Example: "Tools"'}/>
                </Form.Item>

                <Form.Item name="image" label="Device logo" valuePropName="fileList" getValueFromEvent={uploadProps.normFile} >
                    {/*// extra="longgggggggggggggggggggggggggggggggggg"*/}
                    <Upload name="image" listType="picture" beforeUpload={uploadProps.beforeUpload} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Price" name="price" required >
                    <InputNumber type={"number"}
                        min={0}
                        // formatter={value => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        // parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
                <Form.Item
                    label="Device category"
                    name={"categoryId"}
                    required tooltip="Select parent Device or set null to show in top of categories tree."
                >
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="Select a Device"
                        {...selectParams}
                    />
                </Form.Item>
                <Form.Item
                    label="Brand"
                    name={"brandId"}
                    required tooltip="Select device brand"
                >
                    <Select
                        showSearch
                        style={{width: 200}}
                        placeholder="Select a Device"
                        {...brandSelectParams}
                    />
                </Form.Item>
                <Form.Item label="Availability" name="availability" required >
                    <InputNumber type={"number"}
                                 min={0}
                        // formatter={value => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        // parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
            </Form>
            <div>
                {errors && errors.map((error, index) => <div key={index}><Text style={{color: "red"}}>{error}</Text></div>)}
            </div>
        </Modal>
    );
};

export default DeviceCreationForm;
