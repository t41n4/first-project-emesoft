import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormContext, useForm } from "react-hook-form";

interface IPopupMessageProps {
  openDialog: boolean;
  setOpenDialog: any;
  content: string;
  setOpenDrawer: any;
  reset?: () => void;
  clearErrors?: () => void | undefined;
}
const DialogMessage = (props: IPopupMessageProps) => {
  const {
    formState: { errors },
  } = useForm();
  const {
    openDialog,
    setOpenDialog,
    content,
    setOpenDrawer,
    reset,
    clearErrors,
  } = props;

  const handleClose = (confirm: string) => {
    if (confirm === "no") {
      setOpenDrawer(false);
      setOpenDialog(false);
      if (reset) {
        reset();
      }
    } else {
      setOpenDialog(false);
    }
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Message</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose("no")}
            className="bg-red-500 text-white hover:bg-red-400"
          >
            No
          </Button>
          <Button
            onClick={() => handleClose("yes")}
            autoFocus
            className="bg-blue-500 text-white hover:bg-blue-400"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogMessage;
