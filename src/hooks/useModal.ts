import React from "react";

type UseModalType = [
    showModal: Function,
    modalProps: Object
]

export default function (modalTitle: string) {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const modalProps = {
        modalTitle,
        confirmLoading,
        visible,
        handleOk,
        handleCancel
    }

    return {
        showModal,
        modalTitle,
        confirmLoading,
        visible,
        handleOk,
        handleCancel
    }
}
