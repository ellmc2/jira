export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
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
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
