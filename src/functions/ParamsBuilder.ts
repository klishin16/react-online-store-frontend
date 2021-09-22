

export class ParamsBuilder {
    private readonly paramsMap;

    constructor(params?: Map<string, string>) {
        this.paramsMap = params ? params : new Map<string, string>();
    }

    addParam(key: string, value: string) {
        this.paramsMap.set(key, value)
    }

    build() {
        return Object.fromEntries(this.paramsMap)
    }
}
