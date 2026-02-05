import { Car } from "@/type/types";
import Image from "next/image";
import css from "./CarCard.module.css";
import { useRouter } from "next/navigation";
import { formatMileage } from "@/lib/utils/formatters";
import { useCarStore } from "@/store/useCarStore";
import { useState, useEffect } from "react";
export default function CarCard({ car }: { car: Car }) {
  const address = car.address.split(",");
  const router = useRouter();

  const favorites = useCarStore((state) => state.favorites);
  const toggleFavorite = useCarStore((state) => state.toggleFavorite);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // цікаве рішення, можна зробити в Zustand чек сердечок, але так цікавіше
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const isFavorite = isMounted && favorites.includes(car.id);
  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(car.id);
  };

  return (
    <div className={css.card}>
      <span className={css.heart} onClick={handleHeartClick}>
        {isFavorite ? (
          <svg className={css.heartIcon} width="16" height="16">
            <use href="/sprite.svg#heartFull"></use>
          </svg>
        ) : (
          <svg className={css.heartIcon} width="16" height="16">
            <use href="/sprite.svg#heart"></use>
          </svg>
        )}
      </span>
      <Image
        priority
        className={css.img}
        src={car.img}
        alt={car.description}
        width={276}
        height={268}
      />
      <div className={css.info}>
        <p className={css.title}>
          {car.brand} <span className={css.model}>{car.model}</span>,{car.year}
        </p>
        <p>${car.rentalPrice}</p>
      </div>
      <p className={css.description}>
        {`${address[address.length - 2]} | ${address[address.length - 1]} | ${car.rentalCompany} | `}
        <br />
        {`${car.type} | ${formatMileage(car.mileage)} km`}
      </p>
      <button
        className={css.button}
        onClick={() => {
          router.push(`/catalog/${car.id}`);
        }}
      >
        Read more
      </button>
    </div>
  );
}
