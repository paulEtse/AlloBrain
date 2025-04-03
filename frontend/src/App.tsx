import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router";
import "./App.css";
import NotePage from "./pages/note/NotePage";
import NotesPage from "./pages/notes/NotesPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/note/:id" element={<NotePage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
