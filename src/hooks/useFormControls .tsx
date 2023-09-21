import { useState } from "react";
const initialFormValues = {
  fullName: "",
  email: "",
  message: "",
  formSubmitted: false,
  success: false,
};

const useFormControls = () => {
  // We'll update "values" as the form updates
  const [values, setValues] = useState(initialFormValues);
  // "errors" is used to check the form for errors
  const [errors, setErrors] = useState({} as any);
  const validate: any = (fieldValues = values) => {
    // this function will check if the form values are valid
  };
  const handleInputValue: any = (fieldValues = values) => {
    // this function will be triggered by the text field's onBlur and onChange events
  };
  const handleFormSubmit = async (e: any) => {
    // this function will be triggered by the submit event
  };
  const formIsValid: any = () => {
    // this function will check if the form values and return a boolean value
  };
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors,
  };
};
export default useFormControls;
