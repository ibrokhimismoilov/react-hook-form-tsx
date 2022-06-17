import { useForm, SubmitHandler } from "react-hook-form";
import "./App.css";
import { Header } from "./components/Header";

let renderCount = 0;

type Inputs = {
  example?: string;
  exampleRequired?: string;
  firstName?: string;
};

function App() {
  renderCount++;
  console.log(renderCount);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log("errors", errors);

  // console.log(watch("example")); // watch input value by passing the name of it

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
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <input
          {...register("example", {
            required: {
              value: true,
              message: "Majburiy",
            },
            minLength: { value: 4, message: "kamida 4ta simvol" },
          })}
        />
        {errors.example && <p>{errors.example.message}</p>}

        <input
          {...register("exampleRequired", {
            required: {
              value: true,
              message: "Majburiy",
            },
            minLength: { value: 4, message: "kamida 4ta simvol" },
          })}
        />
        {errors.exampleRequired && <p>{errors.exampleRequired.message}</p>}

        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
