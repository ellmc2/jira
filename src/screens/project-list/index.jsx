import { useEffect, useState } from "react";
import qs from "qs";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { clearObject } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  // 用于存放input输入框输入的用户名以及用户id
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  // 用于存放接口返回的项目列表
  const [list, setList] = useState([]);

  // 用于存放用户列表
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(clearObject(params))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json());
        }
      }
    );
  }, [params]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
