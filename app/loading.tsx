import Loader from "@/components/Loader/Loader";
import css from "./page.module.css";

export default function Loading() {
  return (
    <div className={css.globalLoader}>
      <Loader />
    </div>
  );
}
