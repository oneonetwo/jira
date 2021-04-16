import { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import styled from "@emotion/styled";
import { useDebounce, useMount } from '../../utils'
import { useHttp } from 'utils/https';
import { useProject } from 'utils/useProject';
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([]);

    const client = useHttp();
    // const { run, isLoading, isError, data: list } = useAsync<Project[]>();

    //防抖
    const debounceParam = useDebounce(param, 200);
    //获取project列表
    const { isLoading, error, data: list } = useProject(debounceParam)
    // useEffect(() => {
    //     run(client('projects', { data: cleanObject(debounceParam) }))
    // }, [debounceParam])

    useMount(() => {
        client('users').then(setUsers)
        // fetch(`${apiUrl}/users`).then(async res => {
        //     if (res.ok) {
        //         setUsers(await res.json());
        //     }
        // })
    })

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users} />
        <List dataSource={list || []} users={users} loading={isLoading} />
    </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;