import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { DetailProduct } from "@/modules";
import { handleViewDetailProduct } from "@/redux/reducer/ProductSlice_2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import * as productSliceAction from "@/redux/reducer/ProductSlice_2";

jest.mock("@/redux/hooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

describe("View Detail Product", () => {
  const useAppSelectorMock = useAppSelector as jest.Mock;
  const useAppDispatchMock = useAppDispatch as jest.Mock;

  test("Check if function handleViewDetail is called", () => {
    const dispatch = jest.fn();
    useAppDispatchMock.mockReturnValue(dispatch);

    const mockId = 1;
    const comp = render(<DetailProduct id={mockId} />);
    const button = comp.getByRole("button", { name: /view/i });
    fireEvent.click(button);
    expect(dispatch).toHaveBeenCalledWith(handleViewDetailProduct(1));
  });
  test("Check the button when hovering to display the tooltip", async () => {
    const comp = render(<DetailProduct />);
    //Initial check tooltip does not exist
    expect(comp.queryByText(/view detail product/i)).not.toBeInTheDocument();
    //Check if the button is visible
    const button = comp.getByRole("button", { name: /view/i });
    expect(button).toBeInTheDocument();

    //check hovering
    fireEvent.mouseEnter(button);

    await waitFor(() => {
      expect(comp.getByText("view detail product")).toBeInTheDocument();
    });

    fireEvent.mouseLeave(button);
    await waitFor(() => {
      expect(comp.queryByText("view detail product")).not.toBeInTheDocument();
    });
  });
  test("check when click button opens dialog and close button => the dialog closes", () => {
    const mockStore = {
      products2: {
        detailProduct: {
          id: 3,
          productName: "PC",
          price: 300,
          categories: ["electronics"],
        },
      },
    };
    useAppDispatchMock.mockImplementation(() => () => {});
    useAppSelectorMock.mockImplementation((selector) => selector(mockStore));

    const comp = render(<DetailProduct />);
    //The initial dialog box is not displayed
    const dialog = comp.getByTestId("card-viewDetail");
    expect(dialog).not.toBeVisible();
    // Check if the button is visible
    const button = comp.getByRole("button", { name: /view/i });
    expect(button).toBeInTheDocument();

    // click button  view
    fireEvent.click(button);
    expect(dialog).toBeVisible();
    // click button close ,the dialog close
    const closeBtn = comp.getByRole("button", { name: /close/i, hidden: true });
    fireEvent.click(closeBtn);
    expect(dialog).not.toBeVisible();
  });
  test("Check if the displayed title is correct ", () => {
    const comp = render(<DetailProduct />);
    const headding = comp.getByText(/view detail/i);
    expect(headding).toBeInTheDocument();
  });
  test("Check if the dialog displays the full header", () => {
    const comp = render(<DetailProduct />);
    const expectTitle = [
      "Product Name",
      "Price",
      "Category",
      "Main Image",
      "Detail Image",
    ];
    const headers = comp.getAllByRole("rowheader", { hidden: true });
    expect(headers).toHaveLength(5);
    for (let i = 0; i <= headers.length - 1; i++) {
      expect(headers[i]).toHaveTextContent(expectTitle[i]);
    }
  });

  test("check dialog when there is data", () => {
    const mockStore = {
      products2: {
        detailProduct: {
          id: 1,
          productName: "laptop",
          price: 200,
          categories: ["jewelery"],
          picture:
            "https://i.pinimg.com/564x/8e/7f/89/8e7f8987a2508e2f9a854df1791b706c.jpg",
          detailPictures: [
            "https://i.pinimg.com/564x/b1/79/e8/b179e8d49e1da40fd30ba5002ff777de.jpg",
          ],
        },
      },
    };

    useAppSelectorMock.mockImplementation((selector) => selector(mockStore));
    const comp = render(<DetailProduct />);
    // comp.debug();
    const data = mockStore.products2.detailProduct;
    expect(comp.getByText(data.productName)).toBeInTheDocument();
    expect(comp.getByText(data.price)).toBeInTheDocument();
    expect(comp.getByText(data.categories.toString())).toBeInTheDocument();
    expect(comp.getByAltText("main image")).toBeInTheDocument();
    expect(comp.getAllByAltText("detail image")).toHaveLength(
      data.detailPictures.length
    );
  });
  test("check dialog when there is not data", () => {
    const mockStore = {
      products2: {
        detailProduct: {
          id: "",
          productName: "",
          price: "",
          categories: [],
          picture: "",
          detailPictures: [],
        },
      },
    };
    useAppSelectorMock.mockImplementation((selector) => selector(mockStore));
    const comp = render(<DetailProduct />);
    const data = mockStore.products2.detailProduct;
    expect(data.id).toBeFalsy();
    expect(data.productName).toBeFalsy();
    expect(data.categories.toString()).toBeFalsy();
    expect(data.price).toBeFalsy();
    expect(data.price).toBeFalsy();
    expect(data.detailPictures).toHaveLength(0);
  });
  test("Check if DetailProduct receives the id prop correctly", () => {
    const expectedId = 1;
    const comp = render(<DetailProduct id={expectedId} />);
    expect(comp.getByTestId(expectedId)).toBeInTheDocument();
  });
});
