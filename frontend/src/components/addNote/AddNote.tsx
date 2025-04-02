import { FormControl, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import createNote from "../../api/createNote";
import classes from "./AddNote.module.css";

interface AddNoteProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddNote = ({ open, setOpen }: AddNoteProps) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const queryClient = useQueryClient();
  const [errorText, setErrorText] = React.useState("");

  const { mutate } = useMutation({
    mutationFn: async () => {
      await createNote(title, content);
    },
    onSuccess: () => {
      console.log("Note created successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      // reload();
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error creating note:", error);
      setErrorText("Error creating note");
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setErrorText("Please add title");
      return;
    }
    mutate();
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ m: 0, p: 2 }} fullWidth>
      <div className={classes.container}>
        <FormControl className={classes.formContainer}>
          <div className={classes.formItem}>
            <TextField
              autoFocus
              required
              id="name"
              label="Title"
              fullWidth
              variant="standard"
              value={title}
              error={!!errorText}
              helperText={errorText}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value) {
                  setErrorText("");
                }
              }}
            />
          </div>

          <div className={classes.formItem}>
            <textarea
              className={classes.textarea}
              placeholder="Take note here ..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className={classes.actions}>
            <Button type="reset" onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              type="submit"
              autoFocus
              color="success"
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </FormControl>
      </div>
    </Dialog>
  );
};

export default AddNote;
