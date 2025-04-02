const deleteNote = async (noteId: string) => {
  console.log("Deleting note...");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/note/${noteId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = response.text();
  return data;
};

export default deleteNote;
