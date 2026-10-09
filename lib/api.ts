import axios from "axios";
import type { Note, NewNote } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  search: string,
  page: number,
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(newNoteText: NewNote): Promise<Note> {
  const response = await axios.post<Note>("/notes", newNoteText);
  return response.data;
}

export async function deleteNote(noteID: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${noteID}`);
  return response.data;
}
