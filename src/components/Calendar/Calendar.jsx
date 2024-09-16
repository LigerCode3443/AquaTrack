import { useState } from "react";
import CalendarLine from "./CalendarLine/CalendarLine";
import CalendarPagination from "./CalendarPagination/CalendarPagination";
import css from "./Calendar.module.css";
import Statistics from "./Statistics/Statistics";

const buildData = () => {
  const newData = {
    days: [],
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  };

  for (let i = 0; i < new Date(newData.year, newData.month, 0).getDate(); i++) {
    newData.days.push({
      precent: Math.floor(Math.random() * 10) * 10 + 10,
      date: i + 1,
    });
  }

  return newData;
};

const addEmptyDays = (data) => {
  const firstDayDate = new Date(
    data.year,
    data.month - 1,
    data.days[0].date - 1
  );
  const firstDayOfWeek = firstDayDate.getDay();

  const lastDayDate = new Date(
    data.year,
    data.month - 1,
    data.days[data.days.length - 1].date - 1
  );
  const lastDayOfWeek = lastDayDate.getDay();

  const emptyDaysAtStart = [];
  const emptyDaysAtEnd = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    emptyDaysAtStart.push({ isEmpty: true });
  }

  for (let i = lastDayOfWeek + 1; i < 7; i++) {
    emptyDaysAtEnd.push({ isEmpty: true });
  }

  return [...emptyDaysAtStart, ...data.days, ...emptyDaysAtEnd];
};

const splitIntoChunks = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const getLast7Days = (data) => {
  const today = new Date();

  const index = data.days.findIndex(
    (elem) => elem.date - 1 === today.getDate()
  );

  return data.days.slice(index - 7, index);
};

const Calendar = () => {
  const [data, setData] = useState(buildData);
  const [showStatistics, setShowStatistc] = useState(false);

  const chunks = splitIntoChunks(addEmptyDays(data), 7);

  const changeMonth = ({ next, prev }) => {
    if (next)
      setData({
        ...data,
        month: data.month === 12 ? 1 : data.month + 1,
        year: data.month === 12 ? data.year + 1 : data.year,
      });
    else if (prev) {
      setData({
        ...data,
        month: data.month === 1 ? 12 : data.month - 1,
        year: data.month === 1 ? data.year - 1 : data.year,
      });
    }
  };

  const showStatisticsCallback = () => {
    setShowStatistc(!showStatistics);
  };

  return (
    <div>
      <div className={css["pagination-container"]}>
        <h3 className={css.header}>Month</h3>
        <CalendarPagination
          data={data}
          changeMonth={changeMonth}
          isActiveBtn={!showStatistics}
          showStatistics={showStatisticsCallback}
        />
      </div>
      {showStatistics ? (
        <Statistics data={getLast7Days(data)}></Statistics>
      ) : (
        <table className={css.container}>
          <tbody className={css["container-line"]}>
            {chunks.map((elem, i) => (
              <CalendarLine
                key={i}
                items={elem}
                month={data.month}
                year={data.year}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Calendar;
