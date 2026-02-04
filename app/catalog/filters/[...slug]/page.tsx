import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getCars } from "@/lib/apiFn";
import CatalogClient from "./CatalogClient";

const PER_PAGE = 12;

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function FilteredCatalogPage({ params }: Props) {
  const { slug } = await params;
  // const filter = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient({});
  await queryClient.prefetchQuery({
    queryKey: ["cars", PER_PAGE],
    queryFn: () => getCars(PER_PAGE),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
