import { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import "./App.css";
import { Header } from "./components/Header";

let renderCount = 0;

type FromValues = {
  firstName: string;
  lastName: string;
  number: number;
  pets: { name: string }[];
};

function App() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FromValues>({
    mode: "all",
    // delayError: 1,
    defaultValues: {
      firstName: "Ibrokhim",
      lastName: "Ismoilov",
      number: 0,
      pets: [],
    },
  });
  const onSubmit: SubmitHandler<FromValues> = (data) => console.log(data);
  renderCount++;

  useEffect(() => {
    const subscriptsion = watch((data) => {
      console.log(data);
    });
    return () => subscriptsion.unsubscribe();
  }, []);

  const { fields, append, prepend } = useFieldArray<FromValues>({
    control,
    name: "pets",
  });

  return (
    <div className="App">
      <Header renderCount={renderCount} title="React-hook-form" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("firstName", {
            required: {
              value: true,
              message: "Majburiy",
            },
            minLength: { value: 4, message: "kamida 4ta simvol" },
          })}
        />
        {errors?.firstName && <p>{errors?.firstName?.message}</p>}
        <input
          {...register("lastName", {
            required: {
              value: true,
              message: "Majburiy",
            },
            minLength: { value: 4, message: "kamida 4ta simvol" },
          })}
        />
        {errors?.lastName && <p>{errors?.lastName?.message}</p>}

        <input
          type="number"
          {...register("number", {
            valueAsNumber: true,
            required: true,
            // required: {
            //   value: true,
            //   message: "Majburiy",
            // },
            // minLength: { value: 4, message: "kamida 4ta simvol" },
          })}
        />
        {errors?.number && <p>{errors?.number?.message}</p>}

        <h2>Pets</h2>

        <div>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <input
                  {...register(`pets.${index}.name`, {
                    required: "Majburiy",
                    min: 4,
                  })}
                />
                {/* <p>{errors?.pets?[index].name}</p> */}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={() => {
              append({ name: "append1" });
            }}
          >
            Append
          </button>
          <button
            type="button"
            onClick={() => {
              prepend({ name: "append2" });
            }}
          >
            Prepend
          </button>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
