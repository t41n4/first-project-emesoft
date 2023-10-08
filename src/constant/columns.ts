import { Column } from "@/common/table";
import { IName, IAddress } from "@/common/user";

export const columns: readonly Column[] = [
  {
    id: "id",
    label: "id",
    minWidth: 10,
    align: "center",
    format: (value: number) => value.toLocaleString("vi-VN"),
  },
  {
    id: "name",
    label: "name",
    minWidth: 170,
    align: "left",
    format: (value: IName) => {
      const { firstname, lastname } = value;
      return `${firstname} ${lastname}`.toLocaleUpperCase();
    },
  },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "phone",
    label: "phone",
    minWidth: 170,
    align: "left",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "address",
    label: "address",
    minWidth: 170,
    align: "left",
    format: (value: IAddress) => {
      const { city, number, zipcode } = value;
      return `${number} ${city} ${zipcode} `;
    },
  },
  {
    id: "action",
    label: "action",
    minWidth: 170,
    align: "left",
  },
];
