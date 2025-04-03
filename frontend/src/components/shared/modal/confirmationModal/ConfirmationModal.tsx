import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export interface ConfirmationModalProps {
  title: string;
  description: string;
  confirmBtn: string;
  cancelBtn: string;
  onConfirm: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function ConfirmationModal({
  title,
  description,
  confirmBtn,
  cancelBtn,
  onConfirm,
  open,
  setOpen,
}: ConfirmationModalProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          {cancelBtn}
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            handleClose();
          }}
          autoFocus
          color="error"
          variant="contained"
        >
          {confirmBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
