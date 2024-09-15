import PropTypes from "prop-types";
import css from "./CalendarItem.module.css";

const concaniteClasses = (str1, str2) => {
  return `${str1} ${str2}`;
};

const CalendarItem = ({ item, isToday }) => {
  const showStat = (date) => {
    console.log(`Show more about ${date} date`);
  };

  return (
    <th className={!item.isEmpty ? css.container : css["empty-container"]}>
      <button
        className={concaniteClasses(
          css.ball,
          isToday ? css.today : item.percent === 100 ? css.done : css.notDone
        )}
        onClick={() => showStat(item.date)}
      >
        {item.date}
      </button>
      <span className={css.precentage}>{item.percent}%</span>
    </th>
  );
};

CalendarItem.propTypes = {
  item: PropTypes.object,
};

export default CalendarItem;
