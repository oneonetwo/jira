import { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';

import { cleanObject, useDebounce, useMount } from '../../utils'

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    //防抖
    const debounceParam = useDebounce(param, 2000);

    useEffect(() => {
        fetch(`${apiUrl}/projects?${new URLSearchParams(cleanObject(debounceParam))}`).then(async res => {
            if (res.ok) {
                setList(await res.json());
            }
        })
    }, [debounceParam])

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async res => {
            if (res.ok) {
                setUsers(await res.json());
            }
        })
    })

    return <div>
        <SearchPanel param={param} setParam={setParam} users={users} />
        <List list={list} users={users} />
    </div>
}