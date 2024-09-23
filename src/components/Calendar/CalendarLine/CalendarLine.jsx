import PropTypes from "prop-types";
import CalendarItem from "../CalendarItem/CalendarItem";
import css from "./CalendarLine.module.css";

const isToday = (date) => {
  const today = new Date();
  const givenDate = new Date(date);
  return today.toDateString() === givenDate.toDateString();
};

const CalendarLine = ({ items, isHead }) => {
  if (isHead)
    return (
      <tr className={css.line}>
        {items.map((elem) => {
          return (
            <th key={elem}>
              <div className={css.head}>{elem}</div>
            </th>
          );
        })}
      </tr>
    );
  return (
    <tr className={css.line}>
      {items.map((elem, index) => {
        return (
          <CalendarItem
            key={`${elem.date}-${index}`}
            item={elem}
            isToday={isToday(elem.date)}
          />
        );
      })}
    </tr>
  );
};

CalendarLine.propTypes = {
  items: PropTypes.array,
  isHead: PropTypes.bool,
};

export default CalendarLine;
