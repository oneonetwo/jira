import { useState, useEffect } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import styled from "@emotion/styled";
import { useDebounce, useDocumentTitle, useMount } from '../../utils'
import { useHttp } from 'utils/https';
import { useProject } from 'utils/useProject';
import { useUser } from 'utils/useUsers';
import { UseUrlQueryParam } from 'utils/url';
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {

  //要是想把传入的参数作为依赖项，可以 作为状态传入 keys 如， const [keys, setkeys] = useState(['name', 'personId'])
  const [param, setParam] = UseUrlQueryParam(['name', 'personId']);
  useDocumentTitle('项目列表', false);
  //const client = useHttp();
  // const { run, isLoading, isError, data: list } = useAsync<Project[]>();

  //防抖
  const debounceParam = useDebounce(param, 200);
  //获取project列表
  const { isLoading, error, data: list } = useProject(debounceParam);
  // useEffect(() => {
  //     run(client('projects', { data: cleanObject(debounceParam) }))
  // }, [debounceParam])
  //获取User列表
  const { data: users } = useUser();
  //useMount(() => {
  //  client('users').then(setUsers)
  // fetch(`${apiUrl}/users`).then(async res => {
  //     if (res.ok) {
  //         setUsers(await res.json());
  //     }
  // })
  //})

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel param={param} setParam={setParam} users={users || []} />
    <List dataSource={list || []} users={users || []} loading={isLoading} />
  </Container>
}
ProjectListScreen.whyDidYouRender = true;
const Container = styled.div`
  padding: 3.2rem;
`;