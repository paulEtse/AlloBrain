import Note from "../models/Note";
import { reviver } from "./util";

const fetchNotes = async (
  search: string,
  page: number
): Promise<{ notes: Note[]; total: number }> => {
  let url = `${import.meta.env.VITE_BACKEND_URL}/note`;

  if (search) {
    url += `/search/${search}`;
  }
  if (page) {
    url += `?page=${page}`;
  }

  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.text();
  return JSON.parse(data, reviver);
};

export default fetchNotes;
