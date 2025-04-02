const updateNote = async (noteId: string, content: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/note/${noteId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export default updateNote;
