import { UpdateProduct } from "@/modules";
import { Tooltip, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface IProps {
  id: number;
}

const ActionsCell = (props: IProps) => {
  const { id } = props;
  const router = useRouter();

  return (
    <>
      <Tooltip title="delete product">
        <IconButton
          aria-label="delete"
          aria-describedby="message-delete-popper"
          // onClick={(event) => handleClickPopper()}
          className="text-red-600"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <UpdateProduct
      // id={}
      />

      <Tooltip title="view detail product">
        <IconButton
          className="text-blue-600"
          aria-label="view"
          onClick={() => {
            router.push(`/users/${id}`);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ActionsCell;
