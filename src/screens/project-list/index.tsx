import { useState, useEffect, useMemo } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import styled from "@emotion/styled";
import { useDebounce, useDocumentTitle, useMount } from '../../utils'
import { useProject } from 'utils/useProject';
import { useUser } from 'utils/useUsers';
import { UseUrlQueryParam } from 'utils/url';
import { Button, Typography } from 'antd';
import React from 'react';
import { Row } from "components/lib";
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = (props: {setProjectModalOpen: (isOpen: boolean)=>void}) => {
  //要是想把传入的参数作为依赖项，可以 作为状态传入 keys 如， const [keys, setkeys] = useState(['name', 'personId'])
  useDocumentTitle('项目列表', false);
  const [param, setParam] = UseUrlQueryParam(['name', 'personId']);
  const projectParam = useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]);
  //const client = useHttp();
  // const { run, isLoading, isError, data: list } = useAsync<Project[]>();
  //防抖
  const debounceParam = useDebounce(projectParam, 200);
  //获取project列表
  const { isLoading, error, data: list, retry } = useProject(debounceParam);
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
    <Row between={true}>
      <h1>项目列表</h1>
      <Button onClick={()=>props.setProjectModalOpen(true)}></Button>
    </Row>

    <Button onClick={()=>props.setProjectModalOpen(true)}>创建项目</Button>
    <SearchPanel param={{ ...projectParam }} setParam={setParam} users={users || []} />
    {
      error? (
        <Typography.Text type={'danger'}>{ error.message}</Typography.Text>
      ):null
    }
    <List refresh={retry} dataSource={list || []} users={users || []} loading={isLoading} setProjectModalOpen={props.setProjectModalOpen}/>
  </Container>
}
//重复渲染监测机制
ProjectListScreen.whyDidYouRender = false;
const Container = styled.div`
  padding: 3.2rem;
`;