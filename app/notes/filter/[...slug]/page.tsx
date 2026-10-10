import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesProps {
  searchParams: Promise<{ search: string; page: string }>;
  params: Promise<{ slug: string[] }>;
}

export default async function Notes({ searchParams, params }: NotesProps) {
  const { slug } = await params;

  const { search: searchQuery = "", page = "1" } = await searchParams;

  const tag = slug[0] === "all" ? undefined : slug[0];

  const currentPage = Number(page);

  const queryClient = new QueryClient();

  // const searchQuery = "";
  // const currentPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery, currentPage, tag],
    queryFn: () => fetchNotes(searchQuery, currentPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
