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

    return months[monthNumber] || "Invalid month";
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
        {!isActiveBtn
          ? getMonthName(new Date(data[0].date).getMonth())
          : getMonthName(new Date().getMonth())}
        , {new Date(data[0].date).getFullYear()}
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
  data: PropTypes.array,
  changeMonth: PropTypes.func,
  showStatistics: PropTypes.func,
};

export default CalendarPagination;
