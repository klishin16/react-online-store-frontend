import {useEffect, useRef, useState} from "react";

export function useEditForm<EditDatta>(initData: EditDatta) {
    const [data, setData] = useState(initData);
    const originData = useRef(JSON.stringify(data))

    const [edited, setEdited] = useState(false);


    const dataListener = () => {
        console.log(originData)
        if (JSON.stringify(data) != originData.current) {
            setEdited(true)
        }
    }

    useEffect(dataListener, [data])

    return {data, setData, edited}
}
