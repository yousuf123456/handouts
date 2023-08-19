import { ReadonlyURLSearchParams } from "next/navigation";


export const getSearchParamsArray = (searchParams: ReadonlyURLSearchParams, paramsToRemove: string[])=> {
    let paramsArray = []
    //@ts-ignore
    for (const [key, value] of searchParams.entries()) {
        if(paramsToRemove.includes(key)) continue
        paramsArray.push(`${key}=${value}`);
    }

    return paramsArray
}