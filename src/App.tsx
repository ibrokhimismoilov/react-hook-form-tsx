import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { Header } from "./components/Header";

let renderCount = 0;

type FromValues = {
  firstName: string;
  lastName: string;
  number: number;
};

function App() {
  const { register, handleSubmit, watch } = useForm<FromValues>({
    mode: "all",
    // delayError: 1,
    defaultValues: {
      firstName: "Ibrokhim",
      lastName: "Ismoilov",
      number: 0,
    },
  });

  renderCount++;

  useEffect(() => {
    const subscriptsion = watch((data) => console.log(data));
    return () => subscriptsion.unsubscribe();
  }, [watch]);

  const { firstName } = watch();

  return (
    <div className="App">
      <Header renderCount={renderCount} title="React-hook-form" />
      <form onSubmit={handleSubmit((data) => console.log("Submiting", data))}>
        <p>FirstName: {firstName}</p>
        <input
          {...register("firstName", {
            required: {
              value: true,
              message: "Majburiy",
            },
            minLength: { value: 4, message: "kamida 4ta simvol" },
          })}
        />
        <input
          {...register("lastName", {
            required: {
              value: true,
              message: "Majburiy",
            },
            minLength: { value: 4, message: "kamida 4ta simvol" },
          })}
        />

        <input
          type="number"
          {...register("number", {
            valueAsNumber: true,
            required: true,
          })}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
