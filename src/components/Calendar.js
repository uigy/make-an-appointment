import React from "react";
import Navigation from "./Navigation";
import Day from "./Day";
import "../styles/Calendar.scss";

const Calendar = (props) => {
  const { year, month } = props.date;
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const weekDays = dayNames.map((day) => (
    <th key={day} className="day day-name">
      {day}
    </th>
  ));

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const firstMonthDay = new Date(year, month, 1).getDay();

  let weeks = [];

  {
    let days = [];
    let daysBefore = firstMonthDay;
    let daysAfter = daysInMonth;
    let counter = 1;

    for (let i = 0; i < 42; i++) {
      if (daysBefore) {
        let id = `${month - 1}-${daysInPrevMonth - daysBefore}-${year}`;
        days.push(
          <Day
            key={id}
            id={id}
            enabled={false}
            value={daysInPrevMonth - daysBefore}
            activate={props.activate}
          />
        );
        daysBefore--;
      } else if (daysAfter) {
        let id = `${month}-${counter}-${year}`;
        let enabled = true;
        if (
          month === props.currentDate.month &&
          year === props.currentDate.year &&
          counter < props.currentDate.day
        ) {
          enabled = false;
        }
        days.push(
          <Day
            key={id}
            id={id}
            enabled={enabled}
            value={counter++}
            activate={props.activate}
          />
        );
        daysAfter--;
        if (daysAfter === 0) counter = 1;
      } else {
        let id = `${month + 1}-${counter}-${year}`;
        days.push(
          <Day
            key={id}
            id={id}
            enabled={false}
            value={counter++}
            activate={props.activate}
          />
        );
      }
    }

    for (let i = 0; i < 42; i += 7) {
      weeks.push(
        <tr key={i} className="week">
          {days.slice(i, i + 7)}
        </tr>
      );
    }
  }

  return (
    <div className="calendar">
      <Navigation
        date={props.date}
        prev={props.prev}
        next={props.next}
        formatDate={props.formatDate}
        currentDate={props.currentDate}
      />
      <table>
        <thead>
          <tr className="week">{weekDays}</tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
