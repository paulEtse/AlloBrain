const createNote = async (title: string, content: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export default createNote;
