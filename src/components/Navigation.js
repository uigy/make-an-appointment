import React from "react";
import "../styles/Navigation.scss";

const Navigation = (props) => {
  const activeDate = props.formatDate(props.date);

  return (
    <nav className="nav">
      {props.date.month > props.currentDate.month ||
      props.date.year > props.currentDate.year ? (
        <div className="navItem navItem-prev">
          <button className="navButton" onClick={props.prev}>
            Prev
          </button>
        </div>
      ) : null}

      <div className="navItem navItem-date">{activeDate}</div>
      <div className="navItem navItem-next">
        <button className="navButton" onClick={props.next}>
          Next
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
