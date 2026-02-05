import { Car, FilterParams } from "@/type/types";
import { apiNext } from "./api";

interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export async function getCars(
  page: number = 1,
  filter?: FilterParams,
): Promise<CarsResponse> {
  const params = {
    page,
    ...filter,
  };

  const { data } = await apiNext.get<CarsResponse>("/cars", { params });
  return data;
}

export async function getBrands(): Promise<string[]> {
  const response = await apiNext.get("/brands");
  return response.data;
}

export async function getCarById(id: string): Promise<Car> {
  const response = await apiNext.get(`/cars/${id}`);
  return response.data;
}
