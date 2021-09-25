import React, {useEffect} from 'react';
import {Button, Card, Divider, Form, Input, Layout, message, Row, Typography} from "antd";
import {IBrand} from "../../../models/IBrand";
import ButtonWithConfirm from "../../ButtonWithConfirm";
import {useHistory} from "react-router-dom";
import {userTypedSelector} from "../../../hooks/userTypedSelector";
import useExtendedRequest from "../../../hooks/useExtendedRequest";
import {BrandService} from "../../../API/BrandService";
import {useEditForm} from "../../../hooks/useEditForm";


interface IBrandInfoProps {
    brand: IBrand
}

const {Text} = Typography

const BrandInfoCard: React.FC<IBrandInfoProps> = ({brand}) => {
    const history = useHistory()

    const {data, setData, edited} = useEditForm(brand);

    const { token } = userTypedSelector(state => state.auth)

    const [updateResponse, updateLoading, updateError, requestWrapper] = useExtendedRequest()
    const [removeResponse, removeLoading, removeError, removeRequestWrapper] = useExtendedRequest()

    function removeBrand() {
        removeRequestWrapper(() => BrandService.deleteBrand(brand.id!, token!), () => message.success('Deleted!'))
    }

    function updateBrand(updateObj: Partial<IBrand>) {
        requestWrapper(() => BrandService.updateBrand(brand.id!, updateObj, token!), () => message.success("Updated!"))
    }

    useEffect(() => {
        if (removeResponse && !removeError) {
            history.goBack()
        }
    }, [removeResponse]);



    return (
        <Layout>
            <Card style={{margin: '14px 16px'}}>
                <Form>
                    <Row justify={"space-between"}>
                        <Form.Item label="BrandID: ">
                            <Input disabled value={brand.id}/>
                        </Form.Item>
                    </Row>
                    <Divider/>
                    <Row justify={"space-between"}>
                        <Form.Item label="Brand: ">
                            <Input value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
                        </Form.Item>
                    </Row>
                    <Row justify={"space-between"}>
                        <Form.Item label="Description: ">
                            <Input value={data.description} onChange={(e) => setData({...data, description: e.target.value})}/>
                        </Form.Item>
                    </Row>
                </Form>


                <Divider/>

                <Row justify={"end"}>
                    <Button
                        disabled={!edited}
                        style={{color: "green", borderColor: "green", marginRight: '.7vw'}}
                        loading={updateLoading}
                        onClick={() => updateBrand(data)}
                    >Update</Button>
                    <ButtonWithConfirm
                        title={"Удалить"}
                        onConfirm={removeBrand}
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

export default BrandInfoCard;
