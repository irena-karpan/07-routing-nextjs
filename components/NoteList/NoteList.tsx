"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "../NoteList/NoteList.module.css";
import { deleteNote } from "../../lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
    onError: () => {
      toast.error("Something went wrong! Please, try again!");
    },
  });

  const handleDeleteMutation = (noteId: string) => {
    deleteMutation.mutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map((element) => (
        <li key={element.id} className={css.listItem}>
          <h2 className={css.title}>{element.title}</h2>
          <p className={css.content}>{element.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{element.tag}</span>
            <Link href={`/notes/${element.id}`} className={css.link}>
              View details
            </Link>
            <button
              onClick={() => handleDeleteMutation(element.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
