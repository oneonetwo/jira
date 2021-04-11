import { useState } from "react"

export const useArray = <T>(initialArray: T[]) => {
    const [values, setValues] = useState(initialArray);
    return {
        value: values,
        add: (v: T) => {
            setValues(p => [...p, v])
        },
        removeIndex: (index: number) => {
            let copy = [...values];
            copy.splice(index, 1)
            setValues(copy)
        },
        clear: () => {
            setValues([]);
        }
    }
}