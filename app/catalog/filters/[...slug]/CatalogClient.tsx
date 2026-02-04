"use client";

import { useQuery } from "@tanstack/react-query";
import { getCars } from "@/lib/apiFn";
import css from "./page.module.css";
import SearchForm from "@/components/SearchForm/SearchForm";
import CarList from "@/components/CarList/CarList";
// import { useRouter } from "next/navigation";

const PER_PAGE = 12;

// interface CatalogClientProps {
//   slug?: string;
// }

export default function CatalogClient() {
  const { data } = useQuery({
    queryKey: ["cars", PER_PAGE],
    queryFn: () => getCars(PER_PAGE),
    refetchOnMount: false,
  });

  console.log(data);

  return (
    <div className={css.container}>
      <SearchForm />
      <CarList cars={data?.cars || []} />
    </div>
  );
}
