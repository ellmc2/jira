import { useArray, useMount } from "./utils";

export const TSReactTest = () => {
  const person: { name: string; age: number }[] = [
    { name: "jack", age: 30 },
    { name: "ma", age: 25 },
  ];

  const { value, clear, removeIndex, add } = useArray(person);

  useMount(() => {
    // console.log(value.notExist);
    // add({ name: "david" });
    // removeIndex("123");
  });

  return (
    <div>
      <button
        onClick={() =>
          add({
            name: "john",
            age: 32,
          })
        }
      >
        add
      </button>
      <button
        onClick={() => {
          removeIndex(0);
        }}
      >
        remove 0
      </button>
      <button onClick={clear} style={{ marginBottom: 20 }}>
        clear
      </button>
      <ul>
        {value.map((item: any, index: number) => (
          <li key={index}>
            {index} {item.name} {item.age}
          </li>
        ))}
      </ul>
    </div>
  );
};
