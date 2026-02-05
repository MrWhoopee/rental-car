"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";
import { NumericFormat } from "react-number-format";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/lib/apiFn";
import css from "./SearchForm.module.css";
import { customStyles } from "./selectStyles";

interface Option {
  value: string;
  label: string;
}

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // стейти щоб фільтри не зникали
  const [brand, setBrand] = useState<Option | null>(
    searchParams.get("brand")
      ? { value: searchParams.get("brand")!, label: searchParams.get("brand")! }
      : null,
  );
  const [price, setPrice] = useState<Option | null>(
    searchParams.get("rentalPrice")
      ? {
          value: searchParams.get("rentalPrice")!,
          label: searchParams.get("rentalPrice")!,
        }
      : null,
  );
  const [mileageFrom, setMileageFrom] = useState(
    searchParams.get("minMileage") || "",
  );
  const [mileageTo, setMileageTo] = useState(
    searchParams.get("maxMileage") || "",
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
    const params = new URLSearchParams();

    if (brand?.value) params.set("brand", brand.value);
    if (price?.value) params.set("rentalPrice", price.value);
    if (mileageFrom) params.set("minMileage", mileageFrom);
    if (mileageTo) params.set("maxMileage", mileageTo);

    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <form className={css.form} onSubmit={handleSearch}>
      <div className={css.group}>
        <label className={css.label}>Car brand</label>
        <Select
          options={brandOptions}
          styles={customStyles}
          value={brand}
          onChange={(opt) => setBrand(opt as Option)}
          placeholder="Choose a brand"
          isSearchable
        />
      </div>

      <div className={css.group}>
        <label className={css.label}>Price / 1 hour</label>
        <Select
          options={priceOptions}
          styles={customStyles}
          value={price}
          onChange={(opt) => setPrice(opt as Option)}
          placeholder="Choose a price"
          formatOptionLabel={(opt, { context }) =>
            context === "value" ? `To $${opt.label}` : opt.label
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
              onValueChange={(v) => setMileageFrom(v.value)} // Чисте значення без ком
              thousandSeparator=","
            />
          </div>
          <div className={css.inputWrapper} data-prefix="To">
            <NumericFormat
              className={`${css.input} ${css.inputRight}`}
              value={mileageTo}
              onValueChange={(v) => setMileageTo(v.value)}
              thousandSeparator=","
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
