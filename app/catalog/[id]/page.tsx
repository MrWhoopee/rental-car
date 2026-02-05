import Image from "next/image";
import { apiNext } from "@/lib/api";
import css from "./page.module.css";
import CarForm from "@/components/CarForm/CarForm";
import { formatMileage } from "@/lib/utils/formatters";
import MakeCondition from "@/components/MakeCondition/MakeCondition";

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await apiNext.get(`/cars/${id}`);
  console.log(data);
  const shortId = data.id.slice(0, 4).toUpperCase();
  const address = data.address.split(",");

  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        <Image
          priority
          className={css.img}
          src={data.img}
          alt={data.description}
          width={640}
          height={512}
        />
        <CarForm />
      </div>
      <div className={css.infoWrapper}>
        <div className={css.infoTitleWrapper}>
          <h3 className={css.infoTitle}>
            {data.brand} {data.model}, {data.year}
          </h3>
          <span className={css.infoId}>Id: {shortId}</span>
        </div>
        <div className={css.locationWrapper}>
          <svg className={css.locationIcon} width="16" height="16">
            <use href="/sprite.svg#location"></use>
          </svg>
          <p className={css.location}>
            {address[address.length - 2]},{address[address.length - 1]}
          </p>
          <p className={css.mileage}>
            Mileage: {formatMileage(data.mileage)} km
          </p>
        </div>
        <h2 className={css.rentalPrice}>${data.rentalPrice}</h2>
        <p className={css.description}>{data.description}</p>
        <div className={css.allCarInfo}>
          <div>
            <h3 className={css.conditionsTitle}>Rental Conditions: </h3>
            <MakeCondition arr={data.rentalConditions} />
          </div>
          <div>
            <h3 className={css.conditionsTitle}>Car Specifications: </h3>
            <div className={css.specsItem}>
              <svg width="16" height="16">
                <use href="/sprite.svg#calendar"></use>
              </svg>
              <p>Year: {data.year}</p>
            </div>
            <div className={css.specsItem}>
              <svg width="16" height="16">
                <use href="/sprite.svg#car"></use>
              </svg>
              <p>Type: {data.type}</p>
            </div>
            <div className={css.specsItem}>
              <svg width="16" height="16">
                <use href="/sprite.svg#fuel-pump"></use>
              </svg>
              <p>Fuel Consumption: {data.fuelConsumption}</p>
            </div>
            <div className={css.specsItem}>
              <svg width="16" height="16">
                <use href="/sprite.svg#gear"></use>
              </svg>
              <p>Engine Size: {data.engineSize}</p>
            </div>
          </div>
          <div>
            <h3 className={css.conditionsTitle}>
              Accessories and functionalities:
            </h3>
            <MakeCondition
              arr={[...data.accessories, ...data.functionalities]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
