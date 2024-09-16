import PropTypes from "prop-types";
import css from "./CalendarPagination.module.css";

const CalendarPagination = ({
  data,
  isActiveBtn,
  changeMonth,
  showStatistics,
}) => {
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

    return months[monthNumber - 1] || "Invalid month";
  };

  const prevMonth = () => {
    console.log("Change to prev month");
    changeMonth({ prev: true });
  };

  const nextMonth = () => {
    console.log("Change to next month");
    changeMonth({ next: true });
  };

  return (
    <div className={css.container}>
      <button
        disabled={!isActiveBtn}
        className={css["month-back"]}
        onClick={prevMonth}
      ></button>
      <p className={css.date}>
        {isActiveBtn
          ? getMonthName(data.month)
          : getMonthName(new Date().getMonth() + 1)}
        , {data.year}
      </p>
      <button
        disabled={!isActiveBtn}
        className={css["month-next"]}
        onClick={nextMonth}
      ></button>
      <button className={css["month-next"]} onClick={showStatistics}></button>
    </div>
  );
};

CalendarPagination.propTypes = {
  data: PropTypes.object,
  changeMonth: PropTypes.func,
  showStatistics: PropTypes.func,
};

export default CalendarPagination;
