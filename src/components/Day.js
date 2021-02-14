import React from "react";
import "../styles/Day.scss";

const Day = (props) => {
  const { value, id, activate, enabled } = props;
  return (
    <th
      onClick={() => activate(value, id)}
      name={id}
      className={`day ${enabled ? "day-enabled" : "day-disabled"}`}
    >
      {value}
    </th>
  );
};

export default Day;
