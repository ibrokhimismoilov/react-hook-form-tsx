import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { Header } from "./components/Header";

let renderCount = 0;

type FromValues = {
  yourDetails: {
    firstName: string;
    lastName: string;
    number: number;
  };
};

function App() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      isDirty,
      dirtyFields,
      isSubmitted,
      isSubmitting,
      isSubmitSuccessful,
      submitCount,
      errors,
      isValid,
      isValidating,
      touchedFields,
    },
  } = useForm<FromValues>({
    mode: "onChange",
    // delayError: 1,
    defaultValues: {
      yourDetails: {
        firstName: "",
        lastName: "",
        number: 0,
      },
    },
  });

  console.log("isDirty ", isDirty); // fieldlarning qiymati bormi
  console.log("dirtyFields ", dirtyFields); // qiymati bor fieldlar
  console.log("isSubmitted ", isSubmitted); // forma submit bo'ldimi?
  console.log("isSubmitSuccessful ", isSubmitSuccessful); // forma muvofaqqiyatli submit bo'ldimi?
  console.log("submitCount ", submitCount); // forma necha marotaba submit bo'lgani.
  console.log("isSubmitting ", isSubmitting); // forma submit bo'lmoqdami?
  console.log("errors ", errors); // fieldlardagi hatoliklar.
  console.log("isValid ", isValid); // submit bo'lganida validatsiya true/false.
  console.log("isValidating	", isValidating); // submit bo'layotganda validatsiya true/false.
  console.log("touchedFields ", touchedFields); // tanlangan fielddan blur bo'lgan holati.
  renderCount++;

  useEffect(() => {
    const subscriptsion = watch((data) => console.log(data));
    return () => subscriptsion.unsubscribe();
  }, [watch]);

  const {
    yourDetails: { firstName },
  } = watch();

  const onSubmit = async (data: FromValues) => {
    // await setTimeout(() => console.log(data), 3000);
  };

  return (
    <div className="App">
      <Header renderCount={renderCount} title="React-hook-form" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>FirstName: {firstName}</p>
        <input
          {...register("yourDetails.firstName", {
            required: {
              value: true,
              message: "Majburiy",
            },
            minLength: { value: 4, message: "kamida 4ta simvol" },
          })}
        />
        <input
          {...register("yourDetails.lastName", {
            required: {
              value: true,
              message: "Majburiy",
            },
            minLength: { value: 4, message: "kamida 4ta simvol" },
          })}
        />

        <input
          type="number"
          {...register("yourDetails.number", {
            valueAsNumber: true,
            required: true,
          })}
        />

        <button
          onClick={() => {
            setValue("yourDetails.firstName", "Ibrokhim", {
              shouldTouch: true,
            });
          }}
        >
          setValue
        </button>

        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
