import { Car } from "@/type/types";
import Image from "next/image";
import css from "./CarCard.module.css";
import { useRouter } from "next/navigation";

export default function CarCard({ car }: { car: Car }) {
  const description = car.address.split(",");
  const router = useRouter();
  return (
    <div className={css.card}>
      <span className={css.heart}>
        <svg className={css.heartIcon} width="16" height="16">
          <use href="/heart.svg"></use>
        </svg>
      </span>
      <Image
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
        {`${description[description.length - 1]} | ${description[description.length - 2]} | ${car.rentalCompany} | `}
        <br />
        {`${car.type} | ${car.mileage} `}
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
