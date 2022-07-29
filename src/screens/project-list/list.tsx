import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { User } from "./search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

// propsType: Omit<ListProps, 'users'>
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "项目名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render: (val, project) => (
            <span>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </span>
          ),
        },
        {
          title: "创建时间",
          dataIndex: "created",
          render: (val, project) => (
            <span>
              {project.created
                ? dayjs(project.created).format("YYYY-MM-DD")
                : "无"}
            </span>
          ),
        },
      ]}
      {...props}
      rowKey={"id"}
    />
  );
};
