// store/useCarStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car, FilterParams } from "@/type/types";

interface CarState {
  cars: Car[];
  favorites: string[];
  page: number;
  setCars: (newCars: Car[], append: boolean) => void;
  setPage: (page: number) => void;
  toggleFavorite: (carId: string) => void;
  resetCars: () => void;
}

export const useCarStore = create<CarState>()(
  persist(
    (set) => ({
      cars: [],
      favorites: [],
      page: 1,
      setCars: (newCars, append) =>
        set((state) => ({
          cars: append ? [...state.cars, ...newCars] : newCars,
        })),
      setPage: (page) => set({ page }),
      toggleFavorite: (carId) =>
        set((state) => ({
          favorites: state.favorites.includes(carId)
            ? state.favorites.filter((id) => id !== carId)
            : [...state.favorites, carId],
        })),
      resetCars: () => set({ cars: [], page: 1 }),
    }),
    {
      name: "favorites-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
