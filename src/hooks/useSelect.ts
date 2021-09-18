import {useGetApi} from "./useApi";
import {useCallback} from "react";
type OptionProps = {
    label: string,
    value: number
}

export default function<Data> (dataUrl: string, dataSerializer: (data: Data) => OptionProps[], defaultValue?: string) {
    const [data, loading, error, execution] = useGetApi<Data>(dataUrl, true, false);

    function onChange(value: any) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onSearch(val: any) {
        console.log('search:', val);
    }

    function filterOption (input: string, option: any): boolean {
        return true; //TODO
    }
    //    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0

    function onDropdownVisibleChange(open: boolean) {
        if (open) {
            execution()
        }
    }

    const options: OptionProps[] = data ? dataSerializer(data): []

    return {
        loading,
        options,
        filterOption,
        onDropdownVisibleChange,
        defaultValue
    }
}
