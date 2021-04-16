import { useEffect } from "react";
import { useHttp } from 'utils/https';
import { useAsync } from 'utils/useAsync';

import { Project } from 'screens/project-list/list';
import { cleanObject } from "utils";

export const useProject = <D>(param?: D) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>();
    useEffect(() => {
        run(client('projects', { data: cleanObject(param || {}) }))

        // fetch(`${apiUrl}/projects?${new URLSearchParams(cleanObject(debounceParam))}`).then(async res => {
        //     if (res.ok) {
        //         setList(await res.json());
        //     }
        // })
    }, [param])

    return result;
}

