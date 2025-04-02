import Note from "../models/Note";
import { reviver } from "./util";

const fetchNote = async (noteId: string): Promise<Note> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/note/${noteId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.text();
  return JSON.parse(data, reviver);
};

export default fetchNote;
