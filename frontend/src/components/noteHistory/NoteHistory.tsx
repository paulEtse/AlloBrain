import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import * as Diff from "diff";
import { useState } from "react";
import checkoutNote from "../../api/checkoutNote";
import { ellipsis } from "../../api/util";
import Note from "../../model/Note";
import NoteEntry from "../../model/NoteEntry";
import ConfirmationModal from "../share/modal/confirmationModal/ConfirmationModal";
import classes from "./NoteHistory.module.css";

interface NoteHistoryProps {
  note: Note;
  item: NoteEntry;
  previousItem?: NoteEntry;
}

const NoteHistory = ({ note, item, previousItem }: NoteHistoryProps) => {
  const parts = Diff.diffChars(previousItem?.content || "", item.content);
  const [isHovered, setIsHovered] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => checkoutNote(note._id, item.sha1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", note._id] });
    },
  });

  return (
    <div className={classes.container}>
      <h1 className={classes.date}>
        {item.created_at.toLocaleString().slice(0, -3)}
      </h1>
      <div>
        {parts.map((part, index) => {
          const className = part.added
            ? classes.bgGreen
            : part.removed
            ? classes.bgRed
            : "";
          return (
            <span key={index} className={className}>
              {part.value}
            </span>
          );
        })}
      </div>

      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={clsx({
          [classes.sha1]: true,
          [classes.checkoutButton]:
            isHovered && item.sha1 !== note.items[note.items.length - 1].sha1,
        })}
        onClick={() => {
          setOpenConfirmationModal(true);
        }}
        disabled={item.sha1 === note.items[note.items.length - 1].sha1}
      >
        {isHovered && item.sha1 !== note.items[note.items.length - 1].sha1
          ? "Checkout to "
          : item.sha1}
      </button>

      {openConfirmationModal && (
        <ConfirmationModal
          title={`Checkout to version : ${ellipsis(item.content, 20)}`}
          description="Are you sure you want to checkout to this version? This will overwrite your current note content and cannot be undone."
          onConfirm={() => {
            console.log("Checkout confirmed");
            mutate();
          }}
          confirmBtn="Checkout"
          cancelBtn="Cancel"
          open={openConfirmationModal}
          setOpen={setOpenConfirmationModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default NoteHistory;
