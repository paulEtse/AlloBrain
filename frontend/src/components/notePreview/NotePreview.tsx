import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router";
import deleteNote from "../../api/deleteNote";
import { ellipsis } from "../../api/util";
import Note from "../../model/Note";
import ConfirmationModal from "../share/modal/confirmationModal/ConfirmationModal";
import classes from "./NotePreview.module.css";

const NotePreview = ({ note }: { note: Note }) => {
  const navigate = useNavigate();
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);

  const goToNote = () => {
    navigate(`/note/${note._id}`);
  };
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => deleteNote(note._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h4>{note.title}</h4>
        <div className={classes.icons}>
          <EditIcon
            onClick={goToNote}
            className={clsx(classes.editIcon, classes.icon)}
          />
          <DeleteIcon
            onClick={() => {
              setDisplayConfirmationModal(true);
            }}
            className={clsx(classes.deleteIcon, classes.icon)}
          />
        </div>
      </div>
      <div className={classes.description} onClick={goToNote}>
        {ellipsis(note.items[note.items.length - 1].content, 250)}
      </div>
      <div className={classes.footer}>
        <div>
          {note.items.length} update{note.items.length > 1 ? "s" : ""}{" "}
        </div>
        <div className={classes.updatedDate}>
          Edited at {note.updated_at.toLocaleString().slice(0, -3)}
        </div>
      </div>
      {displayConfirmationModal && (
        <ConfirmationModal
          title={`Delete ${ellipsis(note.title, 20)}`}
          description={`Are you sure you want to delete : ${ellipsis(
            note.items[note.items.length - 1].content,
            100
          )}?`}
          onConfirm={mutate}
          confirmBtn="Delete"
          cancelBtn="Cancel"
          open={displayConfirmationModal}
          setOpen={setDisplayConfirmationModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default NotePreview;
