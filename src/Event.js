import React, { Component } from "react";

class Event extends Component {
  state = {
    isShown: false
  };

  toggleDetails = () => this.setState(({ isShown }) => ({ isShown: !isShown }));

  render() {
    const { isShown } = this.state;
    return (
      <div className="eventOverview">
        <h2> {this.props.event.name}</h2>
        <p>
          {this.props.event.local_date} -{this.props.event.local_time} at{" "}
          {this.props.event.venue.name}
        </p>
        <button className="detailsButton" onClick={this.toggleDetails}>
          Details
        </button>
        {isShown && <div className="eventDetails">More details go here</div>}
      </div>
    );
  }
}

export default Event;
