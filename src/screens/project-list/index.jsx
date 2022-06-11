import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";

export const ProjectListScreen = () => {
  // 用于存放input输入框输入的用户名以及用户id
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  // 用于存放接口返回的用户列表
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch().then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [params]);

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} />
      <List list={list} />
    </div>
  );
};
