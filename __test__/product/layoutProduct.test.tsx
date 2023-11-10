import { render, screen } from "@testing-library/react";
import ProductPage from "@/pages/product";
import TableProduct from "@/modules/product/TableProduct";
import * as reactRedux from "react-redux";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock("@/modules/product/TableProduct", () => () => {
  return <div>Table Fake</div>;
});
describe("Layout product", () => {
  const useSelectorMock = reactRedux.useSelector as jest.Mock;
  const useDispatchMock = reactRedux.useDispatch as jest.Mock;
  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
    useSelectorMock.mockImplementation((selector) => selector(mockStore));
  });
  afterEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  const mockStore = {
    products2: {
      listProduct: [],
      detailProduct: {
        id: 3,
        productName: "PC",
        price: 300,
        categories: ["electronics"],
      },
    },
  };
  test("heading display correctly", () => {
    const comp = render(<ProductPage />);
    //
    expect(comp.getByText("List Product")).toBeInTheDocument();
  });
  test("whether there are child components or not", () => {
    const comp = render(<ProductPage />);
    expect(comp.getByText("Table Fake"));
  });
});
