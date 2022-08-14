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
  renderCount++;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState,
    reset,
    getValues,
  } = useForm<FromValues>({
    mode: "onChange",
    // delayError: 1,
    defaultValues: {
      yourDetails: {
        firstName: "asd",
        lastName: "asd",
        number: 0,
      },
    },
  });

  // console.log("isDirty ", isDirty); // fieldlarning qiymati bormi
  // console.log("dirtyFields ", dirtyFields); // qiymati bor fieldlar
  // console.log("isSubmitted ", isSubmitted); // forma submit bo'ldimi?
  // console.log("isSubmitSuccessful ", isSubmitSuccessful); // forma muvofaqqiyatli submit bo'ldimi?
  // console.log("submitCount ", submitCount); // forma necha marotaba submit bo'lgani.
  // console.log("isSubmitting ", isSubmitting); // forma submit bo'lmoqdami?
  // console.log("errors ", errors); // fieldlardagi hatoliklar.
  // console.log("isValid ", isValid); // submit bo'lganida validatsiya true/false.
  // console.log("isValidating	", isValidating); // submit bo'layotganda validatsiya true/false.

  // useEffect(() => {
  //   console.log("touchedFields ", formState.touchedFields); // tanlangan fielddan blur bo'lgan holati.
  // }, [formState]);

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

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(
        {
          ...getValues(),
          yourDetails: { ...getValues().yourDetails, firstName: "Ibrokhim" },
        },
        {
          keepDefaultValues: true,
        }
      );
    }

    // eslint-disable-next-line
  }, [formState, reset]);

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

        <button
          onClick={() =>
            reset(
              {
                yourDetails: {
                  firstName: "Ibrokhim",
                  lastName: "Ismoilov",
                  number: 23,
                },
              },
              {
                keepDefaultValues: true,
              }
            )
          }
        >
          reset
        </button>

        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
