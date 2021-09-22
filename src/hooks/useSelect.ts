import {useGetApi} from "./useApi";

type OptionProps = {
    label: string,
    value: number
}

export default function<Data> (dataUrl: string, dataSerializer: (data: Data) => OptionProps[], defaultValue?: number) {
    const [data, loading, error, execution] = useGetApi<Data>(dataUrl, true, false);

    function onChange(value: any) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onSearch(val: any) {
        console.log('devices:', val);
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
        defaultValue,
        onBlur,
        onChange,
        onSearch
    }
}
