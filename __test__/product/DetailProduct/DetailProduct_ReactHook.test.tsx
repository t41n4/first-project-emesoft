import { render, screen } from "@testing-library/react";
import { DetailProduct } from "@/modules";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

jest.mock("@/redux/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("DetailProduct Use React Hooks", () => {
  const useStateMock = useState as jest.Mock;
  beforeEach(() => {
    // Accepts a function that will be used as an implementation of the mock for one call to the mocked function.
    // Can be chained so that multiple function calls produce different results.
    useStateMock.mockImplementation((init: any) => [init, jest.fn()]);
  });
  test("check backdrop when open = false ", () => {
    useStateMock.mockImplementationOnce(() => [false, jest.fn()]);
    const comp = render(<DetailProduct />);
    screen.debug(comp.baseElement);
    expect(comp.getByTestId("backdrop-viewDetail")).not.toBeVisible();
  });
  test("check backdrop when open = true ", () => {
    useStateMock.mockImplementationOnce(() => [true, jest.fn()]);
    const comp = render(<DetailProduct />);
    screen.debug(comp.baseElement);
    expect(comp.getByTestId("backdrop-viewDetail")).toBeVisible();
  });
});
