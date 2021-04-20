import { useMemo } from "react";
import { useSearchParams } from "react-router-dom"

/*
*返回指定url
*/
// export const  UseUrlQueryParam = (keys: []) => {
//     const [ searchParams, setSearchParams ] = useSearchParams();
//     return [
//         keys.reduce((prev:{}, key:string)=> { 
//             return {...prev, [key]: searchParams.get(key)||''}
//         },{} as {[key in string]: string}),
//         setSearchParams
//     ] as const;
// }
export const UseUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return [
        useMemo(()=>
            keys.reduce((prev, key) => {
                return { ...prev, [key]: searchParams.get(key) || '' }
                }, {} as { [key in K]: string }),
            [searchParams]
        ),
        setSearchParams
    ] as const;
}