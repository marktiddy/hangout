import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";

class Event extends Component {
  state = {
    isShown: false
  };

  toggleDetails = () => this.setState(({ isShown }) => ({ isShown: !isShown }));

  render() {
    const venue = this.props.event.venue;
    const { isShown } = this.state;
    return (
      <div className="eventOverview Event">
        <h4> {this.props.event.name}</h4>
        <p>
          {this.props.event.local_time} - {this.props.event.local_date}
        </p>
        <p>
          Venue:{" "}
          {venue
            ? `${venue.name}, ${venue.address_1}, ${venue.city}`
            : "No Venue"}
        </p>

        <button className="detailsButton" onClick={this.toggleDetails}>
          {isShown ? "Hide Details" : "Show Details"}
        </button>
        {isShown && (
          <div className="eventDetails">
            <strong>Details</strong>
            {ReactHtmlParser(this.props.event.description)}
          </div>
        )}
      </div>
    );
  }
}

export default Event;
