// app/catalog/page.tsx
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getCars } from "@/lib/apiFn";
import { parseSearchParams } from "@/lib/filters";
import CatalogClient from "./CatalogClient";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FilteredCatalogPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = parseSearchParams(params);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["cars", filters],
    queryFn: () => getCars(1, filters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
