import React, {useEffect} from 'react';
import {Button, Card, Col, Divider, Form, Input, Layout, Row, Typography, Image, Select, message} from "antd";
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

    const categorySelectParams = useSelect<ICategory>(
        '/categories',
        dataItem => {
            return {
                label: dataItem.name,
                value: dataItem.id!
            }
        },
        device.categories
    )

    const [removeResponse, removeLoading, error, removeRequestWrapper] = useExtendedRequest()

    function removeCategory() {
        removeRequestWrapper(() => DeviceService.deleteDevice(device.id!, token!), () => message.success('Removed!'))
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
                    <Col span={8}>
                        <Image
                            width={200}
                            src={BASE_BACKEND_URL + '/' + device.image}
                        />
                    </Col>
                    <Col span={16}>
                        <Form.Item label="DeviceID: ">
                            <Input disabled value={device.id}/>
                        </Form.Item>
                        <Divider/>
                        <Form.Item label="Device name: ">
                            <Input value={device.name}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider/>
                <Row justify={"space-between"}>
                    <Form.Item label="Price: ">
                        <Input value={device.price}/>
                    </Form.Item>
                    <Form.Item label="Sale: ">
                        <Input value={device.sale ? device.sale : 0}/>
                    </Form.Item>
                </Row>

                <Divider/>

                <Row justify={"space-between"}>
                    <Form.Item label="Brand: ">
                        {/*{category.parentCategoryId}*/}
                        <Select

                            showSearch
                            style={{width: 200}}
                            placeholder="Select a brand"
                            {...brandSelectParams}
                        />
                    </Form.Item>

                    <Form.Item label="Category: ">
                        {/*{category.parentCategoryId}*/}
                        <Select
                            mode={"tags"}
                            showSearch
                            style={{width: 200}}
                            placeholder="Select a category"
                            {...categorySelectParams}
                        />
                    </Form.Item>
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

export default DeviceInfoCard;
