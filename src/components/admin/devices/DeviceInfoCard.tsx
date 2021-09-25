import React, {useEffect} from 'react';
import {Button, Card, Col, Divider, Form, Image, Input, Layout, message, Row, Select, Typography} from "antd";
import ButtonWithConfirm from "../../ButtonWithConfirm";
import {useHistory} from "react-router-dom";
import {IDevice} from "../../../models/IDevice";
import useExtendedRequest from "../../../hooks/useExtendedRequest";
import {BASE_BACKEND_URL} from '../../../config/constants';
import useSelect from "../../../hooks/useSelect";
import {ICategory} from "../../../models/ICategory";
import {IBrand} from "../../../models/IBrand";
import {DeviceService} from "../../../API/DeviceService";
import {userTypedSelector} from "../../../hooks/userTypedSelector";
import {useEditForm} from "../../../hooks/useEditForm";


interface IDeviceInfoProps {
    device: IDevice
}

const {Text} = Typography

const DeviceInfoCard: React.FC<IDeviceInfoProps> = ({device}) => {
    const history = useHistory()

    const { token } = userTypedSelector(state => state.auth)

    const brandSelectParams = useSelect<IBrand>(
        '/brands',
        dataItem => {
            return {
                label: dataItem.name,
                value: dataItem.id!
            }
        },
        device.brand
    )

    const categoriesSelectParams = useSelect<ICategory>(
        '/categories',
        dataItem => {
            return {
                label: dataItem.name,
                value: dataItem.id!
            }
        },
        device.categories
    )

    const {data, setData, edited} = useEditForm(device);

    const [updateResponse, updateLoading, updateError, updateRequestWrapper] = useExtendedRequest<undefined, any>()
    const [removeResponse, removeLoading, error, removeRequestWrapper] = useExtendedRequest()

    function removeDevice() {
        removeRequestWrapper(() => DeviceService.deleteDevice(device.id!, token!), () => message.success('Removed!'))
    }

    function updateDevice() {
        const updateObj = editDeviceForm.getFieldsValue()
        console.log('Device update:', updateObj)
        updateRequestWrapper(
            () => DeviceService.updateDevice(device.id!, updateObj, token!), () => message.success("Updated!"))
    }

    useEffect(() => {
        if (error) message.error(error)
    }, [error])

    useEffect(() => {
        if (removeResponse && !error) {
            history.goBack()
        }
    }, [removeResponse]);

    const [editDeviceForm] = Form.useForm();


    return (
        <Layout>
            {updateResponse && updateResponse.toString()}
            <Card style={{margin: '14px 16px'}}>
                <Form
                    form={editDeviceForm}
                    initialValues={data}
                >
                <Row justify={"space-between"}>
                    <Col span={8}>
                        <Image
                            width={200}
                            src={BASE_BACKEND_URL + '/' + device.image}
                        />
                    </Col>
                    <Col span={16}>
                        <Form.Item name={'id'} label="DeviceID: ">
                            <Input disabled />
                        </Form.Item>
                        <Divider/>
                        <Form.Item name={'name'} label="Device name: ">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider/>
                <Row justify={"space-between"}>
                    <Form.Item name={'price'} label="Price: ">
                        <Input />
                    </Form.Item>
                    <Form.Item name={'sale'} label="Sale: ">
                        <Input />
                    </Form.Item>
                </Row>

                <Divider/>

                <Row justify={"space-between"}>
                    <Form.Item name={'brandId'} label="Brand: ">
                        <Select
                            showSearch
                            style={{width: 200}}
                            placeholder="Select a brand"
                            {...brandSelectParams}
                        />
                    </Form.Item>

                    <Form.Item name={'categoriesId'} label="Category: ">
                        <Select
                            mode={"tags"}
                            showSearch
                            style={{width: 200}}
                            placeholder="Select a category"
                            {...categoriesSelectParams}
                        />
                    </Form.Item>
                </Row>
                </Form>

                <Divider/>

                <Row justify={"end"}>
                    <Button
                        style={{color: "green", borderColor: "green", marginRight: '.7vw'}}
                        disabled={edited}
                        loading={updateLoading}
                        onClick={() => updateDevice()}
                    >Update</Button>
                    <ButtonWithConfirm
                        title={"Удалить"}
                        onConfirm={removeDevice}
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

export default DeviceInfoCard;
