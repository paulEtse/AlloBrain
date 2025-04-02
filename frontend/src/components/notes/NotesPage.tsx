import AddCardIcon from "@mui/icons-material/AddCard";
import { Button, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import fetchNotes from "../../api/fetchNotes";
import { DEFAULT_PAGINATION_LIMIT } from "../../api/util";
import AddNote from "../addNote/AddNote";
import NotePreview from "../notePreview/NotePreview";
import Loader from "../share/loader/Loader";
import SearchBar from "../share/searchBar/SearchBar";
import classes from "./NotesPage.module.css";
const NotesPage = () => {
  const [userSearch, setUserSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const page = Number(searchParams.get("page")) || 1;
  const {
    data: notes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["notes", userSearch, page],
    queryFn: () => fetchNotes(userSearch, page),
  });
  useEffect(() => {
    refetch();
    // remove page param from url
    if (searchParams.get("page")) {
      searchParams.delete("page");
      setSearchParams(searchParams);
    }
  }, [userSearch]);

  return (
    <div>
      <SearchBar setValue={setUserSearch} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {notes && (
            <>
              <div className={classes.notesHeaderContainer}>
                <div>
                  {notes?.notes?.length > 0 && `${notes.total} notes found`}
                </div>
                <div>
                  <Button
                    className={classes.createNoteButton}
                    onClick={() => {
                      setOpenAddNoteModal(true);
                    }}
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<AddCardIcon />}
                  >
                    Add new note
                  </Button>
                </div>
              </div>
              <div className={classes.notesContainer}>
                {notes.notes.map((note) => (
                  <NotePreview note={note} key={note._id} />
                ))}
                {notes?.notes?.length === 0 && (
                  <div className={classes.noNotes}>
                    <p>
                      No notes found <br />
                      You can create one by clicking the button above
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

      {notes?.notes && (
        <div className={classes.pagination}>
          <Pagination
            count={Math.ceil(notes.total / DEFAULT_PAGINATION_LIMIT)}
            page={page}
            onChange={(event, value) => {
              console.log("Page changed to:", value);
              setSearchParams({ page: value.toString() });

              refetch();
            }}
          />
        </div>
      )}
      {openAddNoteModal && (
        <AddNote
          open={openAddNoteModal}
          setOpen={setOpenAddNoteModal}
        ></AddNote>
      )}
    </div>
  );
};

export default NotesPage;
