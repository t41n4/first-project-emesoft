import { render, screen } from "@testing-library/react";
import { CategoryFilter } from "@/modules";
import { useState, useEffect } from "react";
import fetchMock from "jest-fetch-mock";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));
describe("Check react hook useState of Caterogi", () => {
  const useStateMock = useState as jest.Mock;
  const useEffectMock = useEffect as jest.Mock;
  beforeEach(() => {
    useStateMock.mockImplementation((init: any) => [init, jest.fn()]);
    useEffectMock.mockImplementation((callback: () => void) => callback());
    fetchMock.resetMocks();
  });
  test("check category state when categories empty", () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    const comp = render(<CategoryFilter />);
    screen.debug(comp.baseElement);
  });
});
