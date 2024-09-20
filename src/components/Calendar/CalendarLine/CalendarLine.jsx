import PropTypes from "prop-types";
import CalendarItem from "../CalendarItem/CalendarItem";
import css from "./CalendarLine.module.css";

const isToday = (date) => {
  const today = new Date();
  const givenDate = new Date(date);
  return today.toDateString() === givenDate.toDateString();
};

const CalendarLine = ({ items }) => {
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
  month: PropTypes.number,
  year: PropTypes.number,
};

export default CalendarLine;
