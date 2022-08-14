import React from "react";
import { useForm } from "react-hook-form";
import Controller from "./components/Controller";

import "./App.css";
import Input from "./components/Input";
import { Header } from "./components/Header";

let renderCount = 0;

const App = () => {
  const { control, register, handleSubmit, formState } = useForm({
    defaultValues: {
      firstName: "Ibrokhim",
    },
  });

  const onSubmit = (data) => {
    console.log("onSubmit", data);
  };

  console.log("Errors", formState.errors);
  console.log("formState", formState);

  renderCount++;
  return (
    <div className="App">
      <Header renderCount={renderCount} title="React-hook-form" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          {...{
            isSubmitting: formState.isSubmitting,
            control,
            register,
            name: "firstName",
            onSubmitValue: (value) => value + "---",
            rule: {
              required: {
                value: true,
                message: "Majburiy",
              },
            },
            render: (props) => <Input {...props} />,
          }}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default App;
