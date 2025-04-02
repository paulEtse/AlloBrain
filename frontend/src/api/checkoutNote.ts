const checkoutNote = async (note_id: string, sha1: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/note/${note_id}/${sha1}`,
    {
      method: "POST",
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

export default checkoutNote;
