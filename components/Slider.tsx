"use client";
import { fetchCategories } from "@/constant";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

export interface ICategories {
  [index: number]: string;
}

const Slider = async () => {
  const categories = await fetchCategories();
  return (
    <List className=" bg-slate-400">
      {categories.map((value: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined , index: any) => {
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
      })}
    </List>
  );
};
export default Slider;
