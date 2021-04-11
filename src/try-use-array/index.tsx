import { useMount } from 'utils';
import { useArray } from 'utils/useArray';

interface Person {
    name: string;
    age: number;
}
export const TsReactTest = () => {
    const persons: Person[] = [
        { name: "jack", age: 25 },
        { name: "ma", age: 22 }
    ]
    const { value, clear, removeIndex, add } = useArray(persons);

    useMount(() => {
        add({ name: 'jingyuan', age: 70 });
    })

    return (<div>
        <button onClick={() => add({ name: 'john', age: 22 })}> add john </button>
        <button onClick={() => removeIndex(0)}> remove 0 </button>
        <button onClick={() => clear()}> clear </button>
        {
            value.map((person: Person, index: number) => {
                return <div key={person.name + index}>
                    <span>{index}</span>
                    <span>{person.name}</span>
                    <span>{person.age}</span>
                </div>
            })
        }
    </div>)
}