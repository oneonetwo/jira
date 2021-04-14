import { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import styled from "@emotion/styled";
import { cleanObject, useDebounce, useMount } from '../../utils'
import { useHttp } from 'utils/https';

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);
    const client = useHttp();

    //防抖
    const debounceParam = useDebounce(param, 500);
    useEffect(() => {
        client('projects', { data: cleanObject(debounceParam) }).then(setList);
        // fetch(`${apiUrl}/projects?${new URLSearchParams(cleanObject(debounceParam))}`).then(async res => {
        //     if (res.ok) {
        //         setList(await res.json());
        //     }
        // })
    }, [debounceParam])

    useMount(() => {
        client('users').then(setUsers)
        // fetch(`${apiUrl}/users`).then(async res => {
        //     if (res.ok) {
        //         setUsers(await res.json());
        //     }
        // })
    })

    return <Container>
        <SearchPanel param={param} setParam={setParam} users={users} />
        <List list={list} users={users} />
    </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;