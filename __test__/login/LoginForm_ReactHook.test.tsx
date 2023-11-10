import { fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from "@/modules";

import { useState } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
describe("check react hook useState of LoginForm", () => {
  const useStateMock = useState as jest.Mock;
  beforeEach(() => {
    useStateMock.mockImplementation((init: any) => [init, jest.fn()]);
  });
  test("check useState showPassword = false", () => {
    useStateMock.mockImplementationOnce(() => [false, jest.fn()]);
    const comp = render(<LoginForm />);
    const showPasswordBtn = comp.getByRole("button", {
      name: /visibility/i,
    });
    expect(showPasswordBtn).toBeInTheDocument();
    const iconVisibility = comp.getByTestId("VisibilityIcon");
    expect(iconVisibility).toBeInTheDocument();
  });
  test("check useState showPassword = true", () => {
    useStateMock.mockImplementationOnce(() => [true, jest.fn()]);
    const comp = render(<LoginForm />);
    // screen.debug(comp.baseElement);
    const showPasswordBtn = comp.getByRole("button", {
      name: /visibility/i,
    });
    expect(showPasswordBtn).toBeInTheDocument();
    const iconVisibilityOffIcon = comp.getByTestId("VisibilityOffIcon");
    expect(iconVisibilityOffIcon).toBeInTheDocument();
  });
  test("check useState valueName when onchange input", () => {
    const mockSetValueName = jest.fn();
    useStateMock.mockReturnValue(["", mockSetValueName]);
    const comp = render(<LoginForm />);
    const userNameInput = comp.getByRole("textbox", { name: /user name/i });
    expect(userNameInput).toBeInTheDocument();
    fireEvent.change(userNameInput, { target: { value: "duy khang" } });
    expect(mockSetValueName).toHaveBeenCalledWith("duy khang");

    screen.debug(comp.baseElement);
  });

  test("check useState password when onchange input", () => {
    const mockSetPassword = jest.fn();

    useStateMock.mockReturnValue(["", mockSetPassword]);
    const comp = render(<LoginForm />);
    const passwordFormControl = comp.getByTestId("password"); // Get the FormControl
    const passwordInput = passwordFormControl.querySelector("input"); // Get the input element within the FormControl
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: "duy khang" } });
    expect(mockSetPassword).toHaveBeenCalledWith("duy khang");

    screen.debug(comp.baseElement);
  });
});
