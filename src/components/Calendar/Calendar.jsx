import { useState } from "react";
import CalendarLine from "./CalendarLine/CalendarLine";
import CalendarPagination from "./CalendarPagination/CalendarPagination";
import css from "./Calendar.module.css";
import Statistics from "./Statistics/Statistics";

const buildData = () => {
  return {
    ownerId: "60f7b2e72f9b9c001f8e4b0b",
    waterRecords: [
      {
        userWaterGoal: 2000,
        date: "2024-08-31T21:00:00.000Z",
        quantity: 933,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-01T21:00:00.000Z",
        quantity: 940,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-02T21:00:00.000Z",
        quantity: 1613,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-03T21:00:00.000Z",
        quantity: 187,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-04T21:00:00.000Z",
        quantity: 1353,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-05T21:00:00.000Z",
        quantity: 1948,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-06T21:00:00.000Z",
        quantity: 595,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-07T21:00:00.000Z",
        quantity: 725,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-08T21:00:00.000Z",
        quantity: 1824,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-09T21:00:00.000Z",
        quantity: 1769,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-10T21:00:00.000Z",
        quantity: 622,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-11T21:00:00.000Z",
        quantity: 918,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-12T21:00:00.000Z",
        quantity: 1734,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-13T21:00:00.000Z",
        quantity: 1459,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-14T21:00:00.000Z",
        quantity: 945,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-15T21:00:00.000Z",
        quantity: 561,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-16T21:00:00.000Z",
        quantity: 367,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-17T21:00:00.000Z",
        quantity: 1514,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-18T21:00:00.000Z",
        quantity: 796,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-19T21:00:00.000Z",
        quantity: 1565,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-20T21:00:00.000Z",
        quantity: 1512,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-21T21:00:00.000Z",
        quantity: 1666,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-22T21:00:00.000Z",
        quantity: 1763,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-23T21:00:00.000Z",
        quantity: 503,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-24T21:00:00.000Z",
        quantity: 1206,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-25T21:00:00.000Z",
        quantity: 727,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-26T21:00:00.000Z",
        quantity: 1809,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-27T21:00:00.000Z",
        quantity: 219,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-28T21:00:00.000Z",
        quantity: 411,
      },
      {
        userWaterGoal: 2000,
        date: "2024-09-29T21:00:00.000Z",
        quantity: 1995,
      },
    ],
  };
};

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
    (elem) => new Date(elem.date).getDate() === today.getDate()
  );
  return records.slice(index - 7, index);
};

const Calendar = () => {
  const [data, setData] = useState(() => {
    const data = buildData();

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
        <h3 className={css.header}>Month</h3>
        <CalendarPagination
          data={data.waterRecords}
          changeMonth={changeMonth}
          inActiveBtn={!showStatistics}
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
