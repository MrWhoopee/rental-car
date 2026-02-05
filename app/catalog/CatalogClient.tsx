"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getCars } from "@/lib/apiFn";
import { useCarStore } from "@/store/useCarStore";
import CarList from "@/components/CarList/CarList";
import SearchForm from "@/components/SearchForm/SearchForm";
import css from "./page.module.css";
import Loader from "@/components/Loader/Loader";

export default function CatalogClient() {
  const searchParams = useSearchParams();

  const { cars, page, filters, setCars, setPage, setFilters } = useCarStore();

  useEffect(() => {
    const urlFilters = {
      brand: searchParams.get("brand") || undefined,
      rentalPrice: searchParams.get("rentalPrice") || undefined,
      minMileage: searchParams.get("minMileage") || undefined,
      maxMileage: searchParams.get("maxMileage") || undefined,
    };

    if (JSON.stringify(urlFilters) !== JSON.stringify(filters)) {
      setFilters(urlFilters);
    }
  }, [searchParams, filters, setFilters]);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["cars", filters, page],
    queryFn: () => getCars(page, filters),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (data?.cars) {
      setCars(data.cars, page > 1);
    }
  }, [data, page, setCars]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const hasMore = data ? page < data.totalPages : false;

  return (
    <div className={css.container}>
      <SearchForm />

      <CarList cars={cars} />

      {isFetching && (
        <div className={css.loader}>
          <Loader />
        </div>
      )}

      {isError && (
        <p className={css.error}>Something went wrong... Please try again.</p>
      )}

      {hasMore && !isFetching && (
        <button className={css.loadMoreBtn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
}
