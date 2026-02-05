import { StylesConfig } from "react-select";
import { Option } from "@/type/types";

export const customStyles: StylesConfig<Option, false> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "var(--inputs)",
    borderRadius: "12px",
    border: "none",
    boxShadow: "none",
    // не подобається фіксовані широти, але в іншому варіанті падінги не співпадають
    // padding: "2px 6px",
    width: "204px",
    height: "44px",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "1.25",
    color: "var(--main)",
    cursor: "pointer",
    // display: "flex",

    // alignItems: "center",
    // justifyContent: "center",
    // flexDirection: "row",
    // gap: "32px",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "var(--main)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "var(--main)",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      color: "var(--main)",
    },
  }),
  menu: (provided) => ({
    ...provided,
    border: "1px solid var(--inputs)",
    borderRadius: "12px",
    boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02)",
    background: "var(--white)",
    zIndex: 999,
  }),
  menuList: (provided) => ({
    ...provided,
    scrollbarColor: "var(--gray-light) transparent",
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    color: state.isSelected ? "var(--main)" : "var(--gray)",
    backgroundColor: "transparent",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "1.25",
    // тут падінги знову працюють невірно, зменшую на око
    padding: "5px 18px",
    textAlign: "left",
    "&:hover": {
      color: "var(--main)",
      backgroundColor: "transparent",
    },
  }),
};
