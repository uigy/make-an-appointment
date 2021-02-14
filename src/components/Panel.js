import React from "react";
import "../styles/Panel.scss";

const Panel = (props) => {
  let noAvailableOptions = true;
  let options = [];
  if (props.options && props.options.length > 0) {
    options = props.options.map((option, counter = 0) => (
      <option key={counter++} value={option}>
        {option}
      </option>
    ));
    noAvailableOptions = false;
  }

  return (
    <div className="panel">
      {noAvailableOptions ? (
        <strong>
          <p className="noAvailable">
            Sorry, no available visiting hours for that day. <br />
            Try different date.
          </p>
        </strong>
      ) : (
        <form className="appointmentForm" onSubmit={props.submit}>
          <label className="timeLabel" htmlFor="time">
            Choose the time of the visit:
          </label>
          <select
            onChange={props.handleSelect}
            className="appointmentSelect"
            name="time"
            id="time"
            value={props.selectedOption}
          >
            {options}
          </select>
          <strong>
            <p className="appointmentDate">
              {props.formatDate(props.selectedDate)}
              <br />
              {props.selectedOption}
            </p>
          </strong>
          <button className="appointmentButton">Make an appointment</button>
        </form>
      )}
    </div>
  );
};

export default Panel;
