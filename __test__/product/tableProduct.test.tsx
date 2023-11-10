import { TableProduct } from "@/modules";
import { render, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import { formatNumber } from "@/utils";
import DetailProduct from "@/modules/product/DetailProduct";
import UpdateProduct from "@/modules/product/UpdateProduct";
import PopperDelete from "@/modules/product/PopperDelete";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
//mock button fake
jest.mock("@/modules/product/DetailProduct", () => () => {
  return <button> fake detail</button>;
});
jest.mock("@/modules/product/UpdateProduct", () => () => {
  return <button> fake update</button>;
});
jest.mock("@/modules/product/PopperDelete", () => () => {
  return <button> fake delete</button>;
});
// mock redux
jest.mock("@/redux/hooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

describe("Tabel Product", () => {
  const useAppSelectorMock = useAppSelector as jest.Mock;
  const useAppDispatchMock = useAppDispatch as jest.Mock;

  const mockFormatNumber = jest.fn();
  mockFormatNumber.mockImplementation((price, quantity = 1) => {
    const dollarUS = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return dollarUS.format(price * quantity);
  });

  // beforeEach(() => {
  //   useAppDispatchMock.mockImplementation(() => () => {});
  //   useAppSelectorMock.mockImplementation((selector) => selector(mockStore));
  // });
  // afterEach(() => {
  //   useAppSelectorMock.mockClear();
  //   useAppDispatchMock.mockClear();
  // });

  test("Check if the header is displayed correctly when the table has no data", () => {
    const mockStore = {
      products2: {
        listProduct: [],
      },
    };
    useAppSelectorMock.mockImplementation((selector) => selector(mockStore));
    const comp = render(<TableProduct />);
    // screen.debug(comp.baseElement);

    //check number column header
    const columnHeaders = comp.getAllByRole("columnheader");
    expect(columnHeaders.length).toEqual(5);

    //check title header
    expect(columnHeaders[0]).toHaveTextContent("ID");
    expect(columnHeaders[1]).toHaveTextContent("Product Name");
    expect(columnHeaders[2]).toHaveTextContent("Price");
    expect(columnHeaders[3]).toHaveTextContent("Category");
    expect(columnHeaders[4]).toHaveTextContent("Action");
  });

  test("Check if the header is displayed correctly when the table has data", () => {
    const mockStore = {
      products2: {
        listProduct: [
          {
            id: 1,
            productName: "laptop",
            price: 200,
            categories: ["jewelery"],
          },
          {
            id: 2,
            productName: "tablet",
            price: 100,
            categories: ["men's clothing"],
          },
          {
            id: 3,
            productName: "PC",
            price: 300,
            categories: ["electronics"],
          },
        ],
      },
    };
    useAppSelectorMock.mockImplementation((selector) => selector(mockStore));
    const comp = render(<TableProduct />);
    // screen.debug(comp.baseElement);

    //check number column header
    const columnHeaders = comp.getAllByRole("columnheader");
    expect(columnHeaders.length).toEqual(5);

    //check title header
    expect(columnHeaders[0]).toHaveTextContent("ID");
    expect(columnHeaders[1]).toHaveTextContent("Product Name");
    expect(columnHeaders[2]).toHaveTextContent("Price");
    expect(columnHeaders[3]).toHaveTextContent("Category");
    expect(columnHeaders[4]).toHaveTextContent("Action");
  });
  test("check the table when there is no data", () => {
    const mockStore = {
      products2: {
        listProduct: [],
      },
    };
    useAppSelectorMock.mockImplementation((selector) => selector(mockStore));
    const comp = render(<TableProduct />);
    // screen.debug(comp.baseElement);
    expect(comp.getByText(/no data available/i)).toBeInTheDocument();
  });
  test("check the table when there is data", () => {
    const mockStore = {
      products2: {
        listProduct: [
          {
            id: 1,
            productName: "laptop",
            price: 200,
            categories: ["jewelery"],
          },
          {
            id: 2,
            productName: "tablet",
            price: 100,
            categories: ["men's clothing"],
          },
          {
            id: 3,
            productName: "PC",
            price: 300,
            categories: ["electronics"],
          },
        ],
      },
    };
    useAppSelectorMock.mockImplementation((selector) => selector(mockStore));
    const comp = render(<TableProduct />);
    // screen.debug(comp.baseElement);
    const datas = mockStore.products2.listProduct;
    datas.map((data) => {
      expect(comp.getByText(data.id)).toBeInTheDocument();
      expect(comp.getByText(data.productName)).toBeInTheDocument();
      expect(comp.getByText(data.categories.toString())).toBeInTheDocument();
      const price = mockFormatNumber(data.price);
      expect(comp.getByText(price)).toBeInTheDocument();
    });
  });
  test("Check out a product with multiple categories", () => {
    const mockStore = {
      products2: {
        listProduct: [
          {
            id: 1,
            productName: "laptop",
            price: 200,
            categories: ["jewelery", "men's clothing"],
          },
        ],
      },
    };
    useAppSelectorMock.mockImplementation((selector) => selector(mockStore));
    const comp = render(<TableProduct />);
    const categories = mockStore.products2.listProduct[0].categories;
    expect(categories.length).toBe(2);
    expect(comp.getByText(categories.toString())).toBeInTheDocument();
  });

  test("Check buttons when table has data", () => {
    const mockStore = {
      products2: {
        listProduct: [
          {
            id: 1,
            productName: "laptop",
            price: 200,
            categories: ["jewelery"],
          },
          {
            id: 2,
            productName: "tablet",
            price: 100,
            categories: ["men's clothing"],
          },
          {
            id: 3,
            productName: "PC",
            price: 300,
            categories: ["electronics"],
          },
        ],
      },
    };
    useAppSelectorMock.mockImplementation((selector) => selector(mockStore));
    const comp = render(<TableProduct />);
    screen.debug(comp.baseElement);
    const datas = mockStore.products2.listProduct;
    // check button delete
    const btnDeletes = comp.getAllByRole("button", {
      name: /fake delete/i,
    });
    expect(btnDeletes.length).toEqual(datas.length);
    // check button edit
    const btnEdits = comp.getAllByRole("button", {
      name: /fake update/i,
    });
    expect(btnEdits.length).toEqual(datas.length);

    //check button view detail
    const btndetail = comp.getAllByRole("button", {
      name: /fake detail/i,
    });
    expect(btndetail.length).toEqual(datas.length);
  });
});
