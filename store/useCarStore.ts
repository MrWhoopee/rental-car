import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car, FilterParams } from "@/type/types";

interface CarState {
  cars: Car[];
  favorites: string[];
  page: number;
  filters: FilterParams;
  setCars: (newCars: Car[], append: boolean) => void;
  setPage: (page: number) => void;
  setFilters: (filters: FilterParams) => void;
  toggleFavorite: (carId: string) => void;
  resetCars: () => void;
}

export const useCarStore = create<CarState>()(
  persist(
    (set) => ({
      cars: [],
      favorites: [],
      page: 1,
      filters: {},
      setCars: (newCars, append) =>
        set((state) => ({
          cars: append ? [...state.cars, ...newCars] : newCars,
        })),
      setPage: (newPage) => set({ page: newPage }),
      setFilters: (newFilters) => set({ filters: newFilters }),
      toggleFavorite: (carId) =>
        set((state) => ({
          favorites: state.favorites.includes(carId)
            ? state.favorites.filter((id) => id !== carId)
            : [...state.favorites, carId],
        })),
      resetCars: () => set({ cars: [], page: 1 }),
    }),
    {
      name: "car-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
