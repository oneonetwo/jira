import { Select } from 'antd';
import React from 'react';
import { Raw } from 'types';
//react取出组件props的类型
type selectProps = React.ComponentProps<typeof Select>;
interface IdSelectProps extends Omit<selectProps, 'value'|'onChange'|'defaultOptionName'|'options'>{
    value: Raw | undefined | null;
    onChange: (value?: number)=>void; //把所有的值都转成number
    defaultOptionName: string;
    options?: {name: string, id: number} []
}

export const IdSelect= (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps} = props;
    return <Select 
    value={options?.length? toNumber(value): 0}
    onChange={value=>onChange(toNumber(value) || undefined)}
    {...restProps}
    >
        {
            defaultOptionName?<Select.Option value={0}>{ defaultOptionName }</Select.Option> : null
        }
        {
            options?.map(option=><Select.Option key={option.id} value={option.id}>{ option.name }</Select.Option>)
        }
    </Select>
}
const toNumber = (value: unknown)=>isNaN(Number(value))?0:Number(value);