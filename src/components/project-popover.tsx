import styled from "@emotion/styled";
import { Popover, Typography, List, Divider, Button } from "antd"
import React from "react";
import { useProject } from "utils/useProject"

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
    const { data: projects, isLoading } = useProject();
    const pinnedProject = projects?.filter(item => item.pin);
    const Content = <ContentContainer>
        <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProject?.map(project => <List.Item>
                    <List.Item.Meta title={project.name} />
                </List.Item>)
            }
        </List>
        <Divider />
        {props.projectButton}
    </ContentContainer>

    return <Popover placement={'bottom'} content={Content}>
        项目
    </Popover>
}

const ContentContainer = styled.div`
min-width: 30rem;
`