import React, { useEffect, useState } from "react";
import { useAuth } from "context/auth-context";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Dropdown, Menu, Button } from "antd";
import { Routes, Route, Navigate } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

export const AuthenticatedApp = () => {
    const [projectModalOpen, setProjectModalOpen] = useState(false);
    const resetRoute = () => window.location.href = window.location.origin;
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <Button type={'link'} onClick={resetRoute}>
                        <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
                    </Button>
                    <ProjectPopover projectButton={
                        <Button type={'link'} onClick={()=>setProjectModalOpen(true)}>创建项目</Button>
                    }></ProjectPopover>
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <User />
                </HeaderRight>
            </Header>
            <Main>
                {/* <ProjectListScreen /> */}
                <Router>
                    <Routes>
                        <Route path={'/projects'} element={<ProjectListScreen projectButton={
                        <Button type={'link'} onClick={()=>setProjectModalOpen(true)}>创建项目</Button>
                    }/>} />
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
                        <Navigate to={'/projects'} />
                    </Routes>
                </Router>
            </Main>
            <ProjectModal projectModalOpen={projectModalOpen} onClose={()=>setProjectModalOpen(false)}></ProjectModal>
        </Container>
    );
};

const User = ()=>{
    const { logout, user } = useAuth();
    return  <Dropdown
        overlay={
            <Menu>
                <Menu.Item key={"logout"}>
                    <a onClick={logout}>登出</a>
                </Menu.Item>
            </Menu>
        }
    >
        <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
    </Dropdown>
}


const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;