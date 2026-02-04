import css from "./CarList.module.css";
import { Car } from "@/type/types";
import CarCard from "../CarCard/CarCard";

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  return (
    <ul className={css.list}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </ul>
  );
}
