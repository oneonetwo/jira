import { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import styled from "@emotion/styled";
import { cleanObject, useDebounce, useMount } from '../../utils'
import { useHttp } from 'utils/https';
import { Typography } from 'antd';

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState<null | Error>(null)
    const client = useHttp();

    //防抖
    const debounceParam = useDebounce(param, 500);
    useEffect(() => {
        setIsloading(true);
        client('projects', { data: cleanObject(debounceParam) })
            .then(setList)
            .catch((error) => {
                setList([]);
                setIsloading(false);
                setError(error);
            })
            .finally(() => setIsloading(false));
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
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users} />
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : ''}
        <List dataSource={list} users={users} loading={isLoading} />
    </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;