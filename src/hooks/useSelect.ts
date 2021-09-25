import {useGetApi} from "./useApi";

type OptionProps = {
    label: string,
    value: string | number
}

export default function<OptionData> (dataUrl: string, dataSerializer: (data: OptionData) => OptionProps, value?: OptionData | OptionData[]) {
    const [data, loading, error, execution] = useGetApi<OptionData[]>(dataUrl, true, false);

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

    const options: OptionProps[] = data ? data.map(item => dataSerializer(item)) : []

    return {
        loading,
        options,
        filterOption,
        onDropdownVisibleChange,
        initialValue: value ? Array.isArray(value) ? value.map(v => dataSerializer(v)) : dataSerializer(value)  : undefined,
        defaultValue: value ? Array.isArray(value) ? value.map(v => dataSerializer(v).value) : dataSerializer(value).value  : undefined,
        onBlur,
        onChange,
        onSearch
    }
}
