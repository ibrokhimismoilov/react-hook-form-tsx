import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import "./App.css";
import { Header } from "./components/Header";

let renderCount = 0;

type FromValues = {
  firstName: string;
  lastName: string;
  pets: { name: string }[];
};

function App() {
  const {
    register,
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm<FromValues>({
    mode: "onChange",
    defaultValues: {
      firstName: "Ibrokhim",
      lastName: "Ismoilov",
      pets: [],
    },
  });
  const onSubmit: SubmitHandler<FromValues> = (data) => console.log(data);
  renderCount++;

  console.log("errors", errors);

  // console.log(watch("example")); // watch input value by passing the name of it

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

        <p>Pets</p>

        <div>
          {fields.map((field, index) => {
            return (
              <input
                key={field.id}
                {...register(`pets.${index}.name`, { required: "Majburiy" })}
              />
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
