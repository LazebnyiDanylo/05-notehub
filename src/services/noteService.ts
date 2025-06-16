import axios from "axios";
import type { Note } from "../types/note";

interface FetchNoteResponse {
  notes: Note[];
  totalPages: number;
}

interface NewNote {
  title: string;
  content?: string;
  tag: string;
}

const myApiKey = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
axios.defaults.headers.common["Authorization"] = `Bearer ${myApiKey}`;

export async function fetchNotes(searchText: string, page: number): Promise<FetchNoteResponse> {
  const { data } = await axios.get<FetchNoteResponse>("", {
    params: {
      page,
      perPage: 12,
      ...(searchText !== "" ? { search: searchText } : {}),
    },
  });
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await axios.post<Note>("", newNote);
  return data;
}

export async function deleteNote(noteId: number): Promise<Note> {
  const { data } = await axios.delete<Note>(`/${noteId}`);
  return data;
}
