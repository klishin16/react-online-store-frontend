import React from 'react';
import {Modal} from "antd";


interface IModalFormWrapperProps {
    modalTitle: string;
    confirmLoading: boolean;
    visible: boolean;
    handleOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    handleCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}


const ModalFormWrapper: React.FC<IModalFormWrapperProps> = ({modalTitle, visible, confirmLoading, handleOk, handleCancel, ...props}) => {

    return (
        <Modal
            title={modalTitle}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            {props.children}
        </Modal>
    );
};

export default ModalFormWrapper;
