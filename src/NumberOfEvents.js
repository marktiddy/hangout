import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    eventsToShow: 32
  };

  handleInputChanged = event => {
    const value = event.target.value;
    this.setState({ eventsToShow: value });
  };

  render() {
    return (
      <div className="numberComponent">
        <label>Number of events to show</label>
        <input
          type="text"
          className="updateNumberOfEvents"
          value={this.state.eventsToShow}
          onChange={this.handleInputChanged}
        ></input>
      </div>
    );
  }
}

export default NumberOfEvents;
