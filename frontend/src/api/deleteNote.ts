const deleteNote = async (noteId: string) => {
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
  return response.text();
};

export default deleteNote;
