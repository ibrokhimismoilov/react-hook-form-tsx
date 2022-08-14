import React, { memo } from "react";
import { useFormState, useWatch } from "react-hook-form";

const Controller = ({
  control,
  register,
  name,
  rule,
  render,
  isSubmitting,
  onSubmitValue,
}) => {
  const value = useWatch({ control, name });
  const props = register(name, rule);

  const { errors } = useFormState({ control, name });

  console.log("errors", errors);

  return render({
    onChange: (e) => {
      props.onChange({
        target: {
          name,
          value: e.target.value,
        },
      });
    },
    onBlur: props.onBlur,
    name: props.name,
    value: isSubmitting ? (value) => onSubmitValue(value) : value,
  });
};

export default memo(Controller);
