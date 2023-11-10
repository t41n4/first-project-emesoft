import { render, screen } from "@testing-library/react";
import { ProductLayout } from "@/modules";
import { useProductContext } from "@/context/ProductContext";

jest.mock("@/context/ProductContext", () => ({
  useProductContext: jest.fn(() => ({
    paginateData: {
      jump: jest.fn(),
      maxPage: 3,
    },
    setPage: jest.fn(),
    Page: 1,
  })),
}));
describe("Product layout", () => {
  test("check useContext", () => {
    const comp = render(<ProductLayout />);
    screen.debug(comp.baseElement);
  });
});
