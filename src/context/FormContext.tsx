import { useForm, FormProvider } from "react-hook-form";

const UseFormProvider: React.FC<any> = ({ children }) => {
  const formHandler = useForm();
  return <FormProvider {...formHandler}>{children}</FormProvider>;
};
export default UseFormProvider;
