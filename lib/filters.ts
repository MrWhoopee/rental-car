import { FilterParams } from "@/type/types";

export function parseSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): FilterParams {
  return {
    brand: (searchParams.brand as string) || undefined,
    rentalPrice: (searchParams.rentalPrice as string) || undefined,
    minMileage: (searchParams.minMileage as string) || undefined,
    maxMileage: (searchParams.maxMileage as string) || undefined,
  };
}
