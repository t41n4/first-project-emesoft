import { render, screen } from "@testing-library/react";
import { AddProduct } from "@/modules";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
jest.mock("@/redux/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("AddProduct Use React Hooks", () => {
  test("check backdrop when useState open = false ", () => {
    const comp = render(<AddProduct />);
  });
});
