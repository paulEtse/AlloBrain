import NoteEntry from "./NoteEntry";

interface Note {
  _id: string;
  title: string;
  items: NoteEntry[];
  created_at: Date;
  updated_at: Date;
}

export default Note;
