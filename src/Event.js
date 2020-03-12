import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import SpacesChart from "./SpacesChart";

class Event extends Component {
  state = {
    isShown: false,
    data: [
      { name: "Group A", value: 400 },
      { name: "Group B", value: 300 },
      { name: "Group C", value: 300 },
      { name: "Group D", value: 200 },
      { name: "Group E", value: 278 },
      { name: "Group F", value: 189 }
    ]
  };

  getData = () => {
    const data = [
      { name: "Reservations", value: this.props.event.yes_rsvp_count },
      {
        name: "Free Spaces",
        value: this.props.event.rsvp_limit - this.props.event.yes_rsvp_count
      }
    ];
    console.log(this.props.event.rsvp_limit);
    return data;
  };

  toggleDetails = () => this.setState(({ isShown }) => ({ isShown: !isShown }));

  render() {
    const venue = this.props.event.venue;
    const { isShown } = this.state;
    return (
      <div className="eventOverview Event">
        <div className="eventsGrid">
          <div className="eventsGrid__item">
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
          <div className="eventsGrid__item">
            {" "}
            <SpacesChart data={this.props.event} />
          </div>
        </div>
      </div>
    );
  }
}

export default Event;
