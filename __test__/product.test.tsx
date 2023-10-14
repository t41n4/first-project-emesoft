import { TableProduct } from "@/modules";
import { store } from "@/redux/store/store";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
describe("Product Page", () => {
  // beforeEach(() => {
  //   useAppSelector.mockImplementation(testUseAppSelector);
  // });
  describe("Component", () => {
    it("should have collunm ID,productName,price,category,action  ", () => {
      render(
        <Provider store={store}>
          <TableProduct />
        </Provider>
      );
      const tableHeaders = screen.getByRole("th", {
        name: /ID,Product Name,Price,Category,Action/i,
      });
      expect(tableHeaders.length).toBe(5);
    });
  });
});
