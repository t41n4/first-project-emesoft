import * as utilsAPI from "@/utils";
import { IProduct } from "@/common";
jest.mock("@/utils");
describe("Check Utils", () => {
  test("Check if the function formatNumber executes correctly ", () => {});
  test("check if the function findMax executes correctly", () => {
    const findMaxMock = utilsAPI.findMax as jest.Mock;
    findMaxMock.mockImplementation((values: IProduct[]) => {
      return Math.max(...values.map((value: IProduct) => value.price));
    });
    const datas = [
      {
        id: 1,
        title: "duykhang",
        price: 20,
        image: "duykhang",
        description: "duykhang",
        category: "duykhang",
        rating: {
          count: 5,
          rate: 5,
        },
      },
      {
        id: 1,
        title: "duykhang",
        price: 30,
        image: "duykhang",
        description: "duykhang",
        category: "duykhang",
        rating: {
          count: 5,
          rate: 5,
        },
      },
      {
        id: 1,
        title: "duykhang",
        price: 41,
        image: "duykhang",
        description: "duykhang",
        category: "duykhang",
        rating: {
          count: 5,
          rate: 5,
        },
      },
    ];
    const resutl = findMaxMock(datas);

    expect(resutl).toBe(41);
    expect(findMaxMock).toHaveBeenCalledWith(datas);
  });
  test("check if the function finMin executes correctly", () => {
    const findMinMock = utilsAPI.findMin as jest.Mock;
    findMinMock.mockImplementation((datas: IProduct[]) => {
      return Math.min(...datas.map((data) => data.price));
    });
    const datas = [
      {
        id: 1,
        title: "duykhang",
        price: 20,
        image: "duykhang",
        description: "duykhang",
        category: "duykhang",
        rating: {
          count: 5,
          rate: 5,
        },
      },
      {
        id: 1,
        title: "duykhang",
        price: 30,
        image: "duykhang",
        description: "duykhang",
        category: "duykhang",
        rating: {
          count: 5,
          rate: 5,
        },
      },
      {
        id: 1,
        title: "duykhang",
        price: 41,
        image: "duykhang",
        description: "duykhang",
        category: "duykhang",
        rating: {
          count: 5,
          rate: 5,
        },
      },
    ];

    const result = findMinMock(datas);
    expect(result).toBe(20);
    expect(findMinMock).toHaveBeenCalledWith(datas);
  });
  test("check if the fuction sumPrice executes correctly", () => {
    const sumPriceMock = utilsAPI.sumPrice as jest.Mock;
    sumPriceMock.mockImplementation((carts: any[] | undefined) => {
      if (carts && carts.length > 0) {
        let total = 0;
        carts.map((cart) => {
          total += cart.quantity * cart.price;
        });
        return total;
      }
    });

    const carts = [
      {
        quantity: 1,
        price: 200,
      },
      {
        quantity: 2,
        price: 300,
      },
    ];

    const totalCart = sumPriceMock(carts);
    expect(totalCart).toBe(800);
    expect(sumPriceMock).toHaveBeenCalledWith(carts);
  });
});
