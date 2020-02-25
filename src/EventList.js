import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  render() {
    return (
      <div>
        <ul className="EventList">
          <h3>{this.props.events[0] ? "Upcoming Events" : ""}</h3>

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
