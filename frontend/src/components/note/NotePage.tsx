import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import fetchNote from "../../api/fetchNote";
import { ellipsis } from "../../api/util";
import NoteHistory from "../noteHistory/NoteHistory";
import Loader from "../share/loader/Loader";
import Navigation from "../share/navigation/Navigation";
import EditNote from "./editNote/EditNote";

const NotePage = () => {
  const { id: noteId } = useParams();

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", noteId],

    queryFn: () => {
      if (!noteId) {
        throw new Error("Note ID is required");
      }
      return fetchNote(noteId);
    },
  });

  if (isLoading || !note) {
    return <Loader />;
  }

  const reverseItems = [...note.items].reverse();

  return (
    <div>
      <Navigation
        parts={[
          { name: "Notes", link: "/" },
          { name: ellipsis(note.title, 20), link: `/note/${noteId}` },
        ]}
      />
      <div>
        <h1 style={{ wordWrap: "break-word" }}>{note.title}</h1>
        <EditNote note={note} key={note.items[note.items.length - 1].sha1} />
      </div>

      <h1>Historical changes</h1>

      {reverseItems.map((item, index) => (
        <li key={item.sha1 + item.created_at.toString()}>
          <NoteHistory
            note={note}
            item={item}
            previousItem={reverseItems[index + 1] || undefined}
          />
        </li>
      ))}
    </div>
  );
};
export default NotePage;
