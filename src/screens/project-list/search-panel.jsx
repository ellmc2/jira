import { useState } from "react";

export const SearchPanel = ({ params, setParams }) => {
  // 用于存放选中的用户
  const [users, setUsers] = useState([]);

  return (
    <form>
      <div>
        <input
          type="text"
          value={params.name}
          onChange={(event) => {
            setParams({ ...params, name: event.target.value });
          }}
        />

        <select
          value={params.personId}
          onChange={(event) => {
            setParams({ ...params, personId: event.target.value });
          }}
        >
          <option value={""}>负责人</option>
          {users.map((user) => (
            <option value={user.id}>{user.name} </option>
          ))}
        </select>
      </div>
    </form>
  );
};
