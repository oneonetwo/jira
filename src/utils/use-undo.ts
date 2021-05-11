import { useState } from "react";

export const useUndo = <T>(initialPresent: T)=>{
    const [present, setPresent] = useState(initialPresent);
    const [past, setPast] = useState<T[]>([]);
    const [future, setFuture] = useState<T[]>([]);

    const canUndo = past.length !== 0;
    const canRedo = future.length !== 0;
    const undo = ()=>{
        if(!canUndo) return;
        const previous = past[past.length-1];
        const newPast = past.slice(0, -1);

        setFuture([present, ...future]);
        setPast(newPast);
        setPresent(previous);
    }
    const redo = ()=>{
        if(!canRedo) return;
        const next = future[0];
        const newFuture = future.slice(1);
        setPast([...past, present]);
        setPresent(next);
        setFuture(newFuture);
    }

    const set = (newPresent: T)=>{
        if(newPresent === present){
            return;
        }
        setPast([...past, present])
        setPresent(newPresent);
        setFuture([]);
    }

    const reset = (newPresent: T) => {
        setPast([]);
        setPresent(newPresent);
        setFuture([]);
    }
    return [
        { past, present, future },
        { set, reset, undo, redo, canUndo, canRedo }
    ] as const;
}