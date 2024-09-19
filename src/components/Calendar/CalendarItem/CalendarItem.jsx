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
          isToday
            ? css.today
            : item.quantity === item.userWaterGoal && item.userWaterGoal !== 0
            ? css.done
            : css.notDone
        )}
        onClick={() => showStat(item.date)}
      >
        {new Date(item.date).getDate().toString()}
      </button>
      <span className={css.quantity}>
        {item.quantity !== 0
          ? parseInt((item.quantity / item.userWaterGoal) * 100)
          : 0}
        %
      </span>
    </th>
  );
};

CalendarItem.propTypes = {
  item: PropTypes.object,
};

export default CalendarItem;
