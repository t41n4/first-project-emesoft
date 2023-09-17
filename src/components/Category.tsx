"use client";

import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";



const Catergory = async () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        if (!response.ok) {
          throw new Error("Lỗi khi tải dữ liệu từ API.");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <List className=" bg-slate-400">
      {data.map(
        (
          value:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | PromiseLikeOfReactNode
            | null
            | undefined,
          index: any
        ) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="comments"></IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        }
      )}
    </List>
  );
};
export default Catergory;
