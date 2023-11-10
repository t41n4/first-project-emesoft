import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { AddProduct } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { FormInputProductName } from "@/constant/formAddProduct";

// mock redux toolkit
jest.mock("@/redux/hooks", () => ({
  useAppDispatch: jest.fn(),
}));
jest.mock("@/constant/formAddProduct", () => {
  const original = jest.requireActual("@/constant/formAddProduct");

  return {
    ...original,
    FormInputProductName: jest.fn(({ name, control, label }) => (
      <div>
        <input
          type="text"
          aria-label={label}
          name={name}
          value=""
          onChange={(event) => control.field.onChange(event.target.value)}
        />
      </div>
    )),
  };
});

describe("AddProduct Module", () => {
  test("check hide and show dialog", () => {
    const comp = render(<AddProduct />);
    // check add product button display on the screen
    const addButton = comp.getByRole("button", { name: /add product/i });
    expect(addButton).toBeInTheDocument();
    // initially the add producut  dialog is not displayed
    const dialog = comp.getByTestId(/add product dialog/i);
    expect(dialog).not.toBeVisible();
    fireEvent.click(addButton);
    expect(dialog).toBeVisible();

    // check close dialog
    const closeBtn = comp.getByRole("button", {
      name: /close/i,
      hidden: true,
    });
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(dialog).not.toBeVisible();
  });
  test("Check if the dialog header is displayed correctly", () => {
    const comp = render(<AddProduct />);
    expect(comp.getByText(/create a new product/i)).toBeInTheDocument();
  });
  test("Check that the inputs are displayed correctly", () => {
    const comp = render(<AddProduct />);
    const inputProductName = comp.getByLabelText("Product Name");
    expect(inputProductName).toBeInTheDocument();
    fireEvent.change(inputProductName, { target: { value: "Duy khang" } });
  });

  // test("Check that the inputs are displayed correctly", () => {
  //   const comp = render(<AddProduct />);

  //   // screen.debug(comp.baseElement, 100000);
  //   expect(comp.getByLabelText("Product Name")).toBeInTheDocument();
  //   expect(comp.getByLabelText("Price")).toBeInTheDocument();
  //   expect(comp.getByLabelText("Category")).toBeInTheDocument();
  //   expect(comp.getByLabelText("Picture")).toBeInTheDocument();
  //   expect(comp.getByLabelText("Detail Picture")).toBeInTheDocument();
  // });

  // test("Check when changing the value of product name input", async () => {
  //   const comp = render(<AddProduct />);

  //   const inputProductName = comp.getByLabelText("Product Name");
  //   const addButton = comp.getByRole("button", { name: /add/i });
  //   expect(addButton).toBeInTheDocument();
  //   // when the user enters enough characters
  //   fireEvent.change(inputProductName, { target: { value: "Duy Khang" } });
  //   expect(inputProductName).toHaveValue("Duy Khang");
  //   fireEvent.click(addButton);
  //   expect(comp.queryByText("product name not be empty!")).toBeNull();
  //   // when the user empty input field product name
  //   fireEvent.change(inputProductName, { target: { value: "" } });
  //   expect(inputProductName).toHaveValue("");
  //   fireEvent.click(addButton);
  //   screen.debug(comp.baseElement, 99999);
  // });

  // test("Check when changing the value of product name input", () => {
  //   const comp = render(<AddProduct />);
  //   screen.debug(comp.baseElement, 999999);
  // });
});
