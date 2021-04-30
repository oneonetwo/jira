import { useEffect, useRef, useState } from "react"

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) => value === undefined || value === null || value === "";
export const cleanObject = (object: {[key:string]: unknown}) => {
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
        //依赖项里面机上callback会造成无限循环，这个和usecallback. useMemo 有关系；
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
//防抖
// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        // 每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
};

//切换标题
// export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true)=>{
//     const oldTitle = document.title;
//     useEffect(()=>{
//         document.title = title;
//     },[ title ])

//     useEffect(()=>{
//         return ()=>{
//             if(!keepOnUnmount){
//                 document.title = oldTitle;
//             }
//         }
//     }, [])

// }
export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true)=>{
    const oldTitle = useRef(document.title).current;
    //useRef在组件的整个生命周期都不会变化
    useEffect(()=>{
        document.title = title;
    },[ title ])

    useEffect(()=>{
        return ()=>{
            if(!keepOnUnmount){
                document.title = oldTitle;
            }
        }
    }, [keepOnUnmount, oldTitle])

}
//返回组件的挂载状态，如果还没挂载或者已经卸载。返回false;反之返回true;
export const useMountedRef = ()=>{
    const mountedRef = useRef(false);
    useEffect(()=>{
        mountedRef.current = true;
        return ()=>{
            mountedRef.current = false;
        }
    })
    return mountedRef;
}