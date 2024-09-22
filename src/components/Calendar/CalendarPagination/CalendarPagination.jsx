import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import SvgIcon from "../../SvgIcon/SvgIcon";
import css from "./CalendarPagination.module.css";

const CalendarPagination = ({
  selectedDate,
  isActiveBtn,
  changeMonth,
  showStatistics,
}) => {
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
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
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