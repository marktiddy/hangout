import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  render() {
    function getCity(eventDetails) {
      if (eventDetails) {
        const city = eventDetails.venue.city;
        return `Upcoming Events near ${city}`;
        // return venue.city;
      } else {
        return "Upcoming Events";
      }
    }

    return (
      <div>
        <ul className="EventList">
          <h3 className="eventsTitle">
            {this.props.events[0] ? `${getCity(this.props.events[0])}` : ""}
          </h3>

          {this.props.events.map(event => (
            <li key={event.id}>
              <Event event={event} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default EventList;
