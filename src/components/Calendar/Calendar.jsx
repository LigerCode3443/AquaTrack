import CalendarLine from "./CalendarLine/CalendarLine";
import CalendarPagination from "./CalendarPagination/CalendarPagination";
import css from "./Calendar.module.css";

const Calendar = () => {
  const data = {
    days: [
      { percent: 10, date: 1 },
      { percent: 10, date: 2 },
      { percent: 100, date: 3 },
      { percent: 20, date: 4 },
      { percent: 60, date: 5 },
      { percent: 30, date: 6 },
      { percent: 10, date: 7 },
      { percent: 10, date: 8 },
      { percent: 10, date: 9 },
      { percent: 10, date: 10 },
      { percent: 10, date: 11 },
      { percent: 10, date: 12 },
      { percent: 10, date: 13 },
      { percent: 10, date: 14 },
      { percent: 10, date: 15 },
      { percent: 10, date: 16 },
      { percent: 10, date: 17 },
      { percent: 10, date: 18 },
      { percent: 100, date: 19 },
      { percent: 10, date: 20 },
      { percent: 10, date: 21 },
      { percent: 10, date: 22 },
      { percent: 10, date: 23 },
      { percent: 10, date: 24 },
      { percent: 10, date: 25 },
      { percent: 10, date: 26 },
      { percent: 10, date: 27 },
      { percent: 10, date: 28 },
      { percent: 10, date: 29 },
      { percent: 10, date: 30 },
      { percent: 10, date: 31 },
    ],
    month: 9,
    year: 2024,
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

  const chunks = splitIntoChunks(addEmptyDays(data), 7);

  return (
    <>
      <div className={css["pagination-container"]}>
        <h3 className={css.header}>Month</h3>
        <CalendarPagination data={data} />
      </div>

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
    </>
  );
};

export default Calendar;
