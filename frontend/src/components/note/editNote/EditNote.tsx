import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import updateNote from "../../../api/updateNote";
import Note from "../../../models/Note";
import classes from "./EditNote.module.css";

const EditNote = ({ note }: { note: Note }) => {
  const queryClient = useQueryClient();

  const [newContent, setNewContent] = useState(
    note.items[note.items.length - 1].content
  );

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateNote(note._id, newContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", note._id] });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
    >
      <textarea
        autoFocus
        placeholder="Take note here ..."
        value={newContent}
        onChange={(e) => {
          setNewContent(e.target.value);
        }}
        className={classes.textarea}
      />
      <div className={classes.actions}>
        {newContent !== note.items[note.items.length - 1].content && (
          <>
            <Button
              variant="outlined"
              onClick={() => {
                setNewContent(note.items[note.items.length - 1].content);
              }}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              startIcon={<SaveIcon />}
              loading={isPending}
              loadingPosition="end"
            >
              Save
            </Button>
          </>
        )}
      </div>
    </form>
  );
};

export default EditNote;
