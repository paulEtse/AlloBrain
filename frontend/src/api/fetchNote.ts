import Note from "../model/Note";
import { reviver } from "./util";

const fetchNote = async (noteId: string): Promise<Note> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/note/${noteId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.text();
  console.log({ data });
  const res = JSON.parse(data, reviver);
  console.log({ res });

  return res;
};

export default fetchNote;
