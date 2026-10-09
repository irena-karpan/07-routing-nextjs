"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./page.module.css";
import NoteList from "../../components/NoteList/NoteList";
import { useState } from "react";
import { fetchNotes } from "../../lib/api";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";

import { Toaster } from "react-hot-toast";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";

export default function NotesClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchQuery = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
      setCurrentPage(1);
    },
    300,
  );

  const onModalClose = () => setIsModalOpen(false);
  const onModalOpen = () => setIsModalOpen(true);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchQuery} handleChange={handleSearchQuery} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <button onClick={onModalOpen} className={css.button}>
          Create note +
        </button>
      </div>
      {/* {(isLoading || isFetching) && <Loader />}
      {isError && <UsersError errorMessage={error.message} />} */}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={onModalClose}>
          <NoteForm onClose={onModalClose} />
        </Modal>
      )}
      <Toaster />
    </div>
  );
}
