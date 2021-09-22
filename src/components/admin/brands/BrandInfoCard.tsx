import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, Form, Input, Layout, message, Row, Typography} from "antd";
import {IBrand} from "../../../models/IBrand";
import ButtonWithConfirm from "../../ButtonWithConfirm";
import {HttpMethods, useDELETEApi} from "../../../hooks/useApi";
import {useHistory} from "react-router-dom";
import {RequestBuilder} from "../../../functions/RequestBuilder";
import {userTypedSelector} from "../../../hooks/userTypedSelector";
import axios from "axios";
import useExtendedRequest from "../../../hooks/useExtendedRequest";


interface IBrandInfoProps {
    brand: IBrand
}

const {Text} = Typography

const BrandInfoCard: React.FC<IBrandInfoProps> = ({brand}) => {
    const history = useHistory()

    const [brandUpdated, setBrandUpdated] = useState(brand);

    const { token } = userTypedSelector(state => state.auth)

    const [updateResponse, updateLoading, updateError, requestWrapper] = useExtendedRequest()
    const [removeResponse, removeLoading, error, execution] = useDELETEApi(`/brands/${brand.id}`, true, false)

    function removeBrand() {
        execution()
    }

    function updateBrand(updateObj: Partial<IBrand>) {
        const rb = new RequestBuilder(`/brands/${brand.id}`, HttpMethods.PATCH, updateObj).includeToken(token!)
        requestWrapper(() => axios(rb.build()), () => message.success("Updated!"))
    }

    useEffect(() => {
        if (removeResponse && !error) {
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
                            <Input value={brandUpdated.name} onChange={(e) => setBrandUpdated({...brandUpdated, name: e.target.value})}/>
                        </Form.Item>
                    </Row>
                    <Row justify={"space-between"}>
                        <Form.Item label="Description: ">
                            <Input value={brandUpdated.description} onChange={(e) => setBrandUpdated({...brandUpdated, description: e.target.value})}/>
                        </Form.Item>
                    </Row>
                </Form>


                <Divider/>

                <Row justify={"end"}>
                    <Button
                        style={{color: "green", borderColor: "green", marginRight: '.7vw'}}
                        loading={updateLoading}
                        onClick={() => updateBrand(brandUpdated)}
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
