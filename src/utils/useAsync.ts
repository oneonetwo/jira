import { useReducer, useState } from "react"
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
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig };
    //用useState 惰性初始化状态, 初始值为函数
    const [retry, setRetry] = useState(() => () => { })
    const mountedRef = useMountedRef();
    const [state, setState] = useState<State<D>>(
        { ...defaultInitialState, ...initialState }
    );
    const setData = (data: D) => {
        setState({
            data,
            stat: 'success',
            error: null
        })
    }
    const setError = (error: Error) => {
        setState({
            stat: 'error',
            data: null,
            error
        })
    }

    //用来承载异步请求
    const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (promise && typeof promise.then === 'function') {
            //用retry保存接口状态，来做重新渲染数据
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig.retry(), runConfig);
                }
            })
            setState({ ...state, stat: 'loading' });
            return promise.then(data => {
                if(mountedRef.current){
                    setData(data);
                }
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
    }
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