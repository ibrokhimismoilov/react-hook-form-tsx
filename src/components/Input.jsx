import { memo, useEffect, useState } from "react";

const Input = (props) => {
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <input
      name={props.name}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange && props.onChange(e);
      }}
      value={value}
    />
  );
};

export default memo(Input);
