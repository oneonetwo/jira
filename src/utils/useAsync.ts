import { useCallback, useReducer, useState } from "react"
import { useMountedRef } from "utils";

interface State<D> {
    error: Error | null;
    stat: 'idel' | 'loading' | 'error' | 'success';
    data: D | null;
}
const defaultInitialState: State<null> = {
    error: null,
    data: null,
    stat: 'idel'
}
const defaultConfig = {
    throwOnError: false
}
const useSafeDispatch = <T>(dispatch:(...args: T[])=>void)=>{
    const mountedRef = useMountedRef();
    return (...args: T[])=>(mountedRef.current ? dispatch(...args): void 0);
}
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig };
    // const mountedRef = useMountedRef();
    const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>)=>({...state, ...action}), {
        ...defaultInitialState, ...initialState
    }) 
    const safeDispatch = useSafeDispatch(dispatch);
    //用useState 惰性初始化状态, 初始值为函数
    const [retry, setRetry] = useState(() => () => { });

    const setData = useCallback((data: D) => {
        safeDispatch({
            data,
            stat: 'success',
            error: null
        })
    }, [safeDispatch])
    const setError = useCallback((error: Error) => {
        safeDispatch({
            stat: 'error',
            data: null,
            error
        })
    }, [safeDispatch])

    //用来承载异步请求
    const run = useCallback((
        promise: Promise<D>, 
        runConfig?: { retry: () => Promise<D> }
        ) => {
            if (promise && typeof promise.then === 'function') {
                //用retry保存接口状态，来做重新渲染数据
                setRetry(() => () => {
                    if (runConfig?.retry) {
                        run(runConfig.retry(), runConfig);
                    }
                })
                safeDispatch({stat: 'loading'})
                return promise.then(data => {
                    setData(data);
                    return data;
                }).catch(error => {
                    setError(error);
                    if (config.throwOnError) {
                        return Promise.reject(error);
                    }
                    return error;
                })
            } else {
                throw new Error('请传入promise');
            }
        },[config.throwOnError, setData, state, setError, safeDispatch])
    return {
        isLoading: state.stat === 'loading',
        isIdel: state.stat === 'idel',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        setData,
        setError,
        run,
        retry,
        ...state
    }
}