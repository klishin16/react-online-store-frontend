import React, {useEffect} from 'react';
import {Button, ButtonProps, Popconfirm} from "antd";

interface IButtonWithConfirmProps extends ButtonProps {
        onConfirm: (e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void,
        popconfirmTitle: string
}


const ButtonWithConfirm: React.FC<IButtonWithConfirmProps> = ({title, popconfirmTitle, loading, onConfirm, style}) => {
    const [visible, setVisible] = React.useState(false);

    const showPopconfirm = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    useEffect(
        () => {
            console.log("here!!!")
            if (visible && !loading) {
                setVisible(false)
            }
        },
        [loading],
    );


    return (
        <>
            <Popconfirm
                title={popconfirmTitle}
                visible={visible}
                onConfirm={onConfirm}
                okButtonProps={{ loading: loading }}
                onCancel={handleCancel}
            >
                <Button style={style} onClick={showPopconfirm}>
                    {title}
                </Button>
            </Popconfirm>
        </>
    );
};

export default ButtonWithConfirm;
