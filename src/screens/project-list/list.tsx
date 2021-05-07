import { Button, Dropdown, Menu, Table, TableProps } from 'antd';
import { User } from 'screens/project-list/search-panel';
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import { Pin } from 'components/pin';
import { ProjectListScreen } from '.';
import { useEditProject } from 'utils/useProject';
import React from 'react';
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}
interface ListProps extends TableProps<Project> {
    users: User[];
    refresh?: () => void;
    setProjectModalOpen: (isOpen: boolean) => void;
}

export const List = ({ users, ...props }: ListProps) => {
    const { mutate } = useEditProject();
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props?.refresh)
    return <Table
        rowKey={'id'}
        pagination={false}
        columns={[
            {
                title: <Pin checked={true} disabled={true} />,
                render(value, project) {
                    return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
                }
            },
            {
                title: '名称',
                sorter: (a, b) => a.name.localeCompare(b.name),
                render(value, project) {
                    return <Link to={String(project.id)} >{project.name}</Link>
                }
            },
            {
                title: '部门',
                dataIndex: 'organization',
                sorter: (a, b) => a.name.localeCompare(b.name)
            },
            {
                title: '负责人',
                render(value, project) {
                    return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
                }
            },
            {
                title: '创建时间',
                render(value, project) {
                    return <span>
                        {project.created
                            ? dayjs(project.created).format("YYYY-MM-DD")
                            : "无"}
                    </span>
                }
            }, {
                title: '操作',
                render(value, project) {
                    return <Dropdown overlay={<Menu>
                        <Menu.Item key={"edit"}>
                            <Button type={"link"} onClick={() => { props.setProjectModalOpen(true) }}>编辑</Button>
                        </Menu.Item>
                    </Menu>}>
                        <Button type={"link"}> ... </Button>
                    </Dropdown>
                }
            }

        ]}
        {...props}
    ></Table>
    // return <table>
    //     <thead>
    //         <tr>
    //             <th>名称</th>
    //             <th>负责人</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         {
    //             list.map(project => <tr key={project.name}>
    //                 <td>{project.name}</td>
    //                 <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
    //             </tr>)
    //         }
    //     </tbody>
    // </table>;
}