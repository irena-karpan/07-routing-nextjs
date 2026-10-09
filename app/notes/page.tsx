import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesProps {
  searchParams: Promise<{ search: string; page: string }>;
}

export default async function Notes({ searchParams }: NotesProps) {
  const { search: searchQuery = "", page = "1" } = await searchParams;

  const currentPage = Number(page);

  const queryClient = new QueryClient();

  // const searchQuery = "";
  // const currentPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
