import React, { Component } from "react";
//import { WarningAlert } from "./Alert";

class NumberOfEvents extends Component {
  // state = {
  //   warningText: ""
  // };

  handleChoiceChange = event => {
    const value = event.target.value;

    // if (value <= 0) {
    //   this.setState({ warningText: "Number cannot be below 0" });
    // } else {
    //   this.setState({ warningText: "" });
    // }
    this.props.updateNumber(value);
  };

  render() {
    return (
      <div className="numberComponent">
        <div className="numberComponent__item">
          <p>Number of events to show</p>
        </div>

        <div className="numberComponent__item">
          <select
            id="numEventsChoice"
            className="select-css"
            name="eventsToShow"
            onChange={this.handleChoiceChange}
            defaultValue={this.props.numEvents}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    );
  }
}

export default NumberOfEvents;
