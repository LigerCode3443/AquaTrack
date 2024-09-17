import { useState } from "react";

import CalendarLine from "./CalendarLine/CalendarLine";
import CalendarPagination from "./CalendarPagination/CalendarPagination";
import css from "./Calendar.module.css";
import Statistics from "./Statistics/Statistics";

import jsonData from "./data.json";

const addEmptyDays = (record) => {
  const firstDayDate = new Date(record[0].date);
  firstDayDate.setDate(firstDayDate.getDate() - 1);
  const firstDayOfWeek = firstDayDate.getDay();

  const lastDayDate = new Date(record[record.length - 1].date);
  lastDayDate.setDate(firstDayDate.getDate() - 1);
  const lastDayOfWeek = lastDayDate.getDay();

  const emptyDaysAtStart = [];
  const emptyDaysAtEnd = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    emptyDaysAtStart.push({ isEmpty: true });
  }

  for (let i = lastDayOfWeek + 1; i < 7; i++) {
    emptyDaysAtEnd.push({ isEmpty: true });
  }

  return [...emptyDaysAtStart, ...record, ...emptyDaysAtEnd];
};

const splitIntoChunks = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const getLast7Days = (records) => {
  const today = new Date();

  const index = records.findIndex(
    (elem) => new Date(elem.date).toDateString() === today.toDateString()
  );
  return records.slice(index - 6, index + 1);
};

const Calendar = () => {
  const [data, setData] = useState(() => {
    const data = jsonData;

    const aggregated = {};

    data.waterRecords.forEach((record) => {
      const { date, quantity } = record;

      const dateStump = new Date(date);
      dateStump.setDate(dateStump.getDate() + 1);

      const dateString = dateStump.toISOString().split("T")[0]; // Use YYYY-MM-DD format

      if (aggregated[dateString]) {
        aggregated[dateString] += quantity;
      } else {
        aggregated[dateString] = quantity;
      }
    });

    return {
      ownerId: data.ownerId,
      waterRecords: Object.keys(aggregated).map((date) => ({
        userWaterGoal: 2000,
        date: new Date(date).toISOString(),
        quantity: aggregated[date],
      })),
    };
  });

  const [showStatistics, setShowStatistc] = useState(false);

  const chunks = splitIntoChunks(addEmptyDays(data.waterRecords), 7);

  const changeMonth = ({ next, prev }) => {
    //To Do
    setData({ ...data, next, prev });
  };

  const showStatisticsCallback = () => {
    setShowStatistc(!showStatistics);
  };

  return (
    <div>
      <div className={css["pagination-container"]}>
        <h3 className={css.header}>
          {showStatistics ? "Statistics" : "Month"}
        </h3>
        <CalendarPagination
          data={data.waterRecords}
          changeMonth={changeMonth}
          isActiveBtn={!showStatistics}
          showStatistics={showStatisticsCallback}
        />
      </div>
      {showStatistics ? (
        <Statistics data={getLast7Days(data.waterRecords)}></Statistics>
      ) : (
        <table className={css.container}>
          <tbody className={css["container-line"]}>
            {chunks.map((elem, i) => (
              <CalendarLine key={i} items={elem} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Calendar;
