import css from "./SearchForm.module.css";
import { getCars } from "@/lib/apiFn";

export default function SearchForm() {
  const handleSearch = () => {
    console.log("object");
  };
  return (
    <form className={css.form} action={handleSearch}>
      <div className={css.group}>
        <label className={css.label} htmlFor="brand">
          Choose a brand
        </label>
        <select className={css.select} name="brand" id="brand">
          {/* тут повинні бути машини з бекенду */}
          <option value="">All</option>
          <option value="">Toyota</option>
          <option value="">Honda</option>
          <option value="">Ford</option>
          <option value="">Chevrolet</option>
        </select>
      </div>

      <div className={css.group}>
        <label className={css.label} htmlFor="price">
          Price/ 1 hour
        </label>
        <select className={css.select} name="price" id="price">
          <option value="">30</option>
          <option value="">40</option>
          <option value="">50</option>
          <option value="">60</option>
          <option value="">70</option>
          <option value="">80</option>
          <option value="">90</option>
          <option value="">100</option>
          <option value="">110</option>
          <option value="">120</option>
          <option value="">130</option>
          <option value="">140</option>
          <option value="">150</option>
          <option value="">160</option>
          <option value="">170</option>
          <option value="">180</option>
          <option value="">190</option>
          <option value="">200</option>
        </select>
      </div>

      <div className={css.group}>
        <label className={css.label} htmlFor="mileage">
          Car mileage / km
        </label>
        <div className={css.inputGroup}>
          <input
            type="text"
            className={`${css.inputLeft} ${css.input}`}
            name="mileage"
            id="mileage"
            placeholder="From"
          />
          <input
            type="text"
            className={`${css.inputRight} ${css.input}`}
            name="mileage"
            id="mileage"
            placeholder="To"
          />
        </div>
      </div>

      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
