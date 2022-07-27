/* @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Form, Input, Select } from "antd";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
}

export const SearchPanel = ({ users, params, setParams }: SearchPanelProps) => {
  return (
    <Form
      layout="inline"
      css={css`
        margin-bottom: 2rem;
      `}
    >
      <Form.Item>
        <Input
          type="text"
          value={params.name}
          placeholder="项目名"
          onChange={(event) => {
            setParams({ ...params, name: event.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={params.personId}
          onChange={(personId) => {
            setParams({ ...params, personId });
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
