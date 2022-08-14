/* @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Form, Input } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "./list";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  params: Partial<Pick<Project, "personId" | "name">>;
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
        <UserSelect
          defaultOptionName="负责人"
          value={params.personId}
          onChange={(personId) => {
            setParams({ ...params, personId });
          }}
        />
      </Form.Item>
    </Form>
  );
};
