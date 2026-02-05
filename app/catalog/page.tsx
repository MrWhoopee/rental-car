// app/catalog/page.tsx
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getCars } from "@/lib/apiFn";
import { parseSearchParams } from "@/lib/filters";
import CatalogClient from "./CatalogClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse our wide range of available cars for rent.",
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FilteredCatalogPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = parseSearchParams(params);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["cars", filters, 1],
    queryFn: () => getCars(1, filters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
