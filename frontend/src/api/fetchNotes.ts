import Note from "../model/Note";
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
  console.log("Response:", response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.text();
  const res = JSON.parse(data, reviver);
  return res;
};

export default fetchNotes;
