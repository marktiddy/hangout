import React, { Component } from "react";

class NumberOfEvents extends Component {
  handleChoiceChange = event => {
    const value = event.target.value;
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
