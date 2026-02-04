import { Car, FilterParams } from "@/type/types";
import { apiNext } from "./api";

interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export async function getCars(
  page: number,
  filter?: FilterParams,
): Promise<CarsResponse> {
  const response = await apiNext.get("/cars", {
    params: {
      page,
      filter,
    },
  });
  return response.data;
}

export async function getBrands(): Promise<string[]> {
  const response = await apiNext.get("/brands");
  return response.data;
}

export async function getCarById(id: string): Promise<Car> {
  const response = await apiNext.get(`/cars/${id}`);
  return response.data;
}
