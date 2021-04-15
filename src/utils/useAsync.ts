import { useReducer, useState } from "react"

interface State<D>{
    error: Error | null;
    stat: 'idel' | 'loading' | 'error' | 'success';
    data: D | null;
}
const defaultInitialState: State<null>= {
    error: null,
    data: null,
    stat: 'idel'
}
export const useAsync = <D>( initialState?: State<D>)=>{
    const [state, setState] = useState<State<D>>(
        { ...defaultInitialState, ...initialState}
    );
    const setData = (data: D)=>{
        setState({
            data,
            stat: 'success',
            error: null
        })
    }
    const setError = (error: Error)=>{
        setState({
            stat: 'error',
            data: null,
            error
        })
    }
    //用来承载异步请求
    const run = (promise: Promise<D>)=>{
        if(promise && typeof promise.then === 'function'){
            setState({...state, stat: 'loading'});
            return promise.then(data=>{
                setData(data);
                return data;
            })
            .catch(error=>{
                setError(error);
                return error;
            })
            .finally()
        }else{
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
        ...state
    }
}