import axios from "axios";
import type { Note } from "../types/note";

interface FetchNoteResponse {
  notes: Note[];
  totalPages: number;
  page: number;
}

const myApiKey = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
axios.defaults.headers.common["Authorization"] = `Bearer ${myApiKey}`;

export async function fetchNotes(searchText: string, page: number, perPage: number): Promise<FetchNoteResponse> {
  const { data } = await axios.get<FetchNoteResponse>("", {
    params: {
      page,
      perPage,
      ...(searchText !== "" ? { search: searchText } : {}),
    },
  });
  return data;
}

export async function createNote(newNote: Note): Promise<Note> {
  const { data } = await axios.post<Note>("", newNote);
  return data;
}

export async function deleteNote(noteId: number): Promise<Note> {
  const { data } = await axios.delete<Note>(`/${noteId}`);
  return data;
}
