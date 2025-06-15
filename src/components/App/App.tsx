import css from "./App.module.css";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import NoteModal from "../NoteModal/NoteModal";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debauncedQuery] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const perPage = 12;

  const { data, isSuccess } = useQuery({
    queryKey: ["myNotes", debauncedQuery, page],
    queryFn: () => fetchNotes(debauncedQuery, page, perPage),
    placeholderData: keepPreviousData,
  });

  function handleSearch(search: string) {
    setSearch(search);
    setPage(1);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} value={search} />
        {isSuccess && data.totalPages > 1 && <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />}
        <button
          className={css.button}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Create note +
        </button>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
