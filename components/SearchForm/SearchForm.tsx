"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";
import { NumericFormat } from "react-number-format";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/lib/apiFn";
import { useCarStore } from "@/store/useCarStore";
import css from "./SearchForm.module.css";
import { customStyles } from "./selectStyles";

interface Option {
  value: string;
  label: string;
}

export default function SearchForm() {
  const searchParams = useSearchParams();

  return <SearchFormContent key={searchParams.toString()} />;
}

function SearchFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setFilters, resetCars, setPage } = useCarStore();

  const [brand, setBrand] = useState<Option | null>(() => {
    const b = searchParams.get("brand");
    return b ? { value: b, label: b } : null;
  });

  const [price, setPrice] = useState<Option | null>(() => {
    const p = searchParams.get("rentalPrice");
    return p ? { value: p, label: p } : null;
  });

  const [mileageFrom, setMileageFrom] = useState(
    () => searchParams.get("minMileage") || "",
  );
  const [mileageTo, setMileageTo] = useState(
    () => searchParams.get("maxMileage") || "",
  );

  const { data: brandList } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 1000 * 60 * 60,
  });

  const brandOptions = useMemo(
    () => [
      { value: "", label: "All Brands" },
      ...(brandList?.map((b) => ({ value: b, label: b })) || []),
    ],
    [brandList],
  );

  const priceOptions = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const val = (30 + i * 10).toString();
        return { value: val, label: val };
      }),
    [],
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const newFilters = {
      brand: brand?.value || undefined,
      rentalPrice: price?.value || undefined,
      minMileage: mileageFrom || undefined,
      maxMileage: mileageTo || undefined,
    };

    const params = new URLSearchParams();
    if (newFilters.brand) params.set("brand", newFilters.brand);
    if (newFilters.rentalPrice)
      params.set("rentalPrice", newFilters.rentalPrice);
    if (newFilters.minMileage) params.set("minMileage", newFilters.minMileage);
    if (newFilters.maxMileage) params.set("maxMileage", newFilters.maxMileage);

    if (params.toString() === searchParams.toString()) return;

    resetCars();
    setPage(1);
    setFilters(newFilters);

    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <form className={css.form} onSubmit={handleSearch}>
      <div className={css.group}>
        <label className={css.label}>Car brand</label>
        <Select
          instanceId="brand-select"
          options={brandOptions}
          styles={customStyles}
          value={brand}
          onChange={(opt) => setBrand(opt as Option)}
          placeholder="Choose a brand"
        />
      </div>

      <div className={css.group}>
        <label className={css.label}>Price / 1 hour</label>
        <Select
          instanceId="price-select"
          options={priceOptions}
          styles={customStyles}
          value={price}
          onChange={(opt) => setPrice(opt as Option)}
          placeholder="Choose a price"
          formatOptionLabel={(opt, { context }) =>
            context === "value" && opt.value !== ""
              ? `To $${opt.label}`
              : opt.label
          }
        />
      </div>

      <div className={css.group}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.inputGroup}>
          <div className={css.inputWrapper} data-prefix="From">
            <NumericFormat
              className={`${css.input} ${css.inputLeft}`}
              value={mileageFrom}
              onValueChange={(v) => setMileageFrom(v.value)}
              thousandSeparator=" "
              placeholder=" "
            />
          </div>
          <div className={css.inputWrapper} data-prefix="To">
            <NumericFormat
              className={`${css.input} ${css.inputRight}`}
              value={mileageTo}
              onValueChange={(v) => setMileageTo(v.value)}
              thousandSeparator=" "
              placeholder=" "
            />
          </div>
        </div>
      </div>

      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
