import { Select } from "antd";
import { Raw } from "types";

const { Option } = Select;

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<
    SelectProps,
    "value" | "onChange" | "defaultOptionName" | "options"
  > {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * @description: value 可以传入多种类型的值
 * @description: onChange 只会回调 number | undefined 类型
 * @description: 当 isNaN(value)  === true 时，代表选择默认类型
 * @description: 当选择默认类型的时候，onChange会回调 undefined
 * @param {IdSelectProps} props
 * @return {*}
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...resetProps } = props;

  return (
    <Select
      value={toNumber(value)}
      onChange={(val) => onChange(toNumber(val) || undefined)}
      {...resetProps}
    >
      {defaultOptionName ? (
        <Option value={0}>{defaultOptionName}</Option>
      ) : null}
      {options?.map((option) => (
        <Option value={option.id} key={option.id}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
};

const toNumber = (val: unknown) => {
  return isNaN(Number(val)) ? 0 : Number(val);
};
