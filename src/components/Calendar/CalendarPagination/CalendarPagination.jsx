import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import SvgIcon from "../../SvgIcon/SvgIcon";
import css from "./CalendarPagination.module.css";
import { useTranslation } from "react-i18next";

const CalendarPagination = ({
  selectedDate,
  isActiveBtn,
  changeMonth,
  showStatistics,
}) => {
  const { t } = useTranslation();
  const [width, setWidth] = useState(window.innerWidth < 768 ? 20 : 24);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setWidth(20);
      } else {
        setWidth(24);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setWidth]);

  const getMonthName = (monthNumber) => {
    const months = [
      t("description.month.January"),
      t("description.month.February"),
      t("description.month.March"),
      t("description.month.April"),
      t("description.month.May"),
      t("description.month.June"),
      t("description.month.July"),
      t("description.month.August"),
      t("description.month.September"),
      t("description.month.October"),
      t("description.month.November"),
      t("description.month.December"),
    ];

    return months[monthNumber] || "Invalid month";
  };

  return (
    <div className={css.container}>
      <button
        disabled={!isActiveBtn}
        className={!isActiveBtn ? css["month-btn-disable"] : css["month-btn"]}
        onClick={() => changeMonth({ prev: true })}
      >
        <SvgIcon id="arrow-left" width={18} height={18} />
      </button>
      <p className={css.date}>
        {isActiveBtn
          ? getMonthName(
              new Date(selectedDate.year, selectedDate.month + 1, 0).getMonth()
            )
          : getMonthName(new Date().getMonth())}
        , {selectedDate.year}
      </p>
      <button
        disabled={!isActiveBtn}
        className={!isActiveBtn ? css["month-btn-disable"] : css["month-btn"]}
        onClick={() => changeMonth({ next: true })}
      >
        <SvgIcon id="arrow-right" width={18} height={18} />
      </button>
      <button
        className={!isActiveBtn ? css.statistics : css["statistics-is-close"]}
        onClick={showStatistics}
      >
        <SvgIcon id="statistics" width={width} height={width} />
      </button>
    </div>
  );
};

CalendarPagination.propTypes = {
  data: PropTypes.array,
  changeMonth: PropTypes.func,
  showStatistics: PropTypes.func,
};

export default CalendarPagination;
