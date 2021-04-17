import React, { Component, PropsWithChildren, ReactNode } from "react";

type FallbackRender = (props: {error: Error|null}) => React.ReactElement;
// export class ErrorBoundary extends Component<{children: ReactNode, fallbackRender: FallbackRender}>{
export class ErrorBoundary extends Component<PropsWithChildren<{fallbackRender: FallbackRender}>, {error: Error | null}> {
    state = { error: null};

    //当子组件抛出异常，这里会接受到并且调用 返回值给state
    static getDerviedStateFromError(error: Error){
        return { error };
    }

    render(){
        const { error } = this.state;
        const { fallbackRender, children } = this.props;
        if(error){
            return fallbackRender({ error })
        }
        return children;
    } 
}