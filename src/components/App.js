import React, { Component } from "react";
import "../styles/App.scss";
import Calendar from "./Calendar";
import Panel from "./Panel";

class App extends Component {
  date = new Date();
  currentDate = {
    day: this.date.getDate(),
    month: this.date.getMonth(),
    year: this.date.getFullYear(),
    dayOfTheWeek: this.date.getDay(),
  };

  dayActivated = false;

  state = {
    date: this.currentDate,
    selectedDate: this.currentDate,
    options: null,
    selectedOption: "",
  };

  handlePrevMonth = () => {
    if (
      this.state.date.month > this.currentDate.month ||
      this.state.date.year > this.currentDate.year
    ) {
      let date = { ...this.state.date };
      if (this.state.date.month > 0) {
        date.month--;
      } else {
        date.month = 11;
        date.year--;
      }
      if (
        date.month === this.state.selectedDate.month &&
        date.month === this.state.selectedDate.month
      ) {
        date.day = this.state.selectedDate.day;
        this.dayActivated = true;
      } else {
        date.day = "";
        this.dayActivated = false;
      }
      this.setState({
        date,
      });
    }
  };

  handleNextMonth = () => {
    let date = { ...this.state.date };
    if (this.state.date.month < 11) {
      date.month++;
    } else {
      date.month = 0;
      date.year++;
    }
    if (
      date.month === this.state.selectedDate.month &&
      date.month === this.state.selectedDate.month
    ) {
      date.day = this.state.selectedDate.day;
      this.dayActivated = true;
    } else {
      date.day = "";
      this.dayActivated = false;
    }
    this.setState({
      date,
    });
  };

  handleSelect = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  activateDay = (date) => {
    const activatedDay = document.querySelector(
      `.day[name='${`${date.month}-${date.day}-${date.year}`}']`
    );
    activatedDay.classList.add("day-activated");
    this.dayActivated = true;
  };

  deactivateDay = (date) => {
    const activatedDay = document.querySelector(
      `.day[name='${`${date.month}-${date.day}-${date.year}`}']`
    );
    activatedDay.classList.remove("day-activated");
    this.dayActivated = false;
  };

  handleActivateDay = (day) => {
    let date = { ...this.state.date };
    date.day = day;
    const newDate = new Date(date.year, date.month, date.day);
    date.dayOfTheWeek = newDate.getDay();
    if (this.dayActivated) {
      this.deactivateDay(this.state.date);
    }
    this.fetchData();
    this.setState({
      date,
      selectedDate: date,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    /* 
      confirm availability and (if true) delete option in source
    */

    alert(
      `You have an appointment on ${this.formatDate(
        this.state.selectedDate
      )} at ${this.state.selectedOption}`
    );
    let options = [...this.state.options];
    options.splice(options.indexOf(this.state.selectedOption), 1);

    this.setState({
      options,
      selectedOption: options[0],
    });
  };

  formatDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return date.day
      ? `${dayNames[date.dayOfTheWeek]}, ${monthNames[date.month]} ${
          date.day
        }, ${date.year}`
      : `${monthNames[date.month]}, ${date.year}`;
  };

  fetchData() {
    const path = "./available.json";
    fetch(path)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((data) => {
        this.getOptions(data);
      })
      .catch((err) => console.error(err));
  }

  getOptions = (data) => {
    const { year, month, day } = this.state.selectedDate;
    const formatedDate = `${year}-${
      month < 9 ? "0" + (month + 1) : month + 1
    }-${day < 10 ? "0" + day : day}`;
    let selectedOption = "";
    if (data.date[formatedDate]) {
      selectedOption = data.date[formatedDate][0];
    }
    this.setState({
      options: data.date[formatedDate],
      selectedOption,
    });
  };

  componentDidMount() {
    this.activateDay(this.state.date);
    this.fetchData();
  }

  componentDidUpdate() {
    if (
      this.state.date.day &&
      this.state.date.year === this.state.selectedDate.year
    ) {
      this.activateDay(this.state.selectedDate);
    }
  }

  render() {
    return (
      <div className="app">
        <Calendar
          date={this.state.date}
          currentDate={this.currentDate}
          prev={this.handlePrevMonth}
          next={this.handleNextMonth}
          activate={this.handleActivateDay}
          formatDate={this.formatDate}
        />
        <Panel
          available={this.state.available}
          formatDate={this.formatDate}
          selectedDate={this.state.selectedDate}
          options={this.state.options}
          selectedOption={this.state.selectedOption}
          handleSelect={this.handleSelect}
          submit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
