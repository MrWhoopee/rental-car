"use client";

import { useEffect, useMemo } from "react";
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
  const { cars, page, setCars, setPage, resetCars, setFilters } = useCarStore();

  const filters = useMemo(
    () => ({
      brand: searchParams.get("brand") || undefined,
      rentalPrice: searchParams.get("rentalPrice") || undefined,
      minMileage: searchParams.get("minMileage") || undefined,
      maxMileage: searchParams.get("maxMileage") || undefined,
    }),
    [searchParams],
  );

  useEffect(() => {
    resetCars();
    setPage(1);
    setFilters(filters);
  }, [searchParams, resetCars, setPage, setFilters, filters]);

  const { data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["cars", filters, page],
    queryFn: () => getCars(page, filters),
    placeholderData: (prev) => prev,
    staleTime: 5000,
  });

  useEffect(() => {
    if (data?.cars) {
      setCars(data.cars, page > 1);
    }
  }, [data, page, setCars]);

  const hasMore = data ? page < data.totalPages : false;

  const isNotFound =
    !isFetching &&
    !isPlaceholderData &&
    (data?.cars.length === 0 || cars.length === 0);

  return (
    <div className={css.container}>
      <SearchForm />

      <CarList cars={cars} />

      {isFetching && (
        <div className={css.loader}>
          <Loader />
        </div>
      )}

      {isNotFound && !isFetching && (
        <p className={css.empty}>No cars found matching your criteria.</p>
      )}

      {hasMore && !isFetching && cars.length > 0 && (
        <button className={css.loadMoreBtn} onClick={() => setPage(page + 1)}>
          Load more
        </button>
      )}
    </div>
  );
}
