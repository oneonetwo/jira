import { useEffect, useState } from "react"

export const isVoid = (value: unknown) => value === undefined || value === null || value === "";
export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = { ...object };
    Object.keys(result).forEach(key => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key];
        }
    })
    return result;
}
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, [])
}
//防抖
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => { setDebounceValue(value) }, delay);
        //effect会在执行当前effect之前对上一个effect进行清除；
        return () => clearTimeout(timeout);
    }, [value, delay])
    return debounceValue;
}
