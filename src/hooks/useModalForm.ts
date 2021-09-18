import React from "react";
import {HttpMethods} from "./useApi";
import axios from "axios";
import {message} from "antd";
import { RequestBuilder } from "../functions/RequestBuilder";
import {userTypedSelector} from "./userTypedSelector";


type UseModalType = [
    showModal: Function,
    modalProps: Object
]

export default function <FromData>(modalTitle: string, url: string) {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const { token } = userTypedSelector(state => state.auth)

    const showModal = () => {
        setVisible(true);
    };

    const onCreate = (formData: FromData) => { //TODO  в постапи возвращать опционально обект request builder а
        setConfirmLoading(true);
        const rb = new RequestBuilder(url, HttpMethods.POST, formData, {}).includeToken(token!)
        console.log("onCreate")
        try {
            axios(rb.build()).finally(() => {
                setConfirmLoading(false);
                message.success("Created successfully!")
                setVisible(false)
            })
        } catch (e: unknown) {
            // @ts-ignore
            message.error(e.toString())
        }
    };


    const onCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return {
        showModal,
        modalTitle,
        confirmLoading,
        visible,
        onCreate,
        onCancel
    }
}
