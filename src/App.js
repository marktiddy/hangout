import React from "react";
import { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents } from "./api";
import Header from "./Header";

class App extends Component {
  state = {
    events: [],
    eventsToShow: 10
  };

  updateNumberToShow = num => {
    this.setState({ eventsToShow: num });
  };

  updateEvents = (lat, lon) => {
    getEvents(lat, lon).then(events => this.setState({ events }));
  };

  processLocation = position => {
    let lat = position.coords.latitude.toFixed(2);
    let lon = position.coords.longitude.toFixed(2);
    this.updateEvents(lat, lon);
  };

  componentDidMount() {
    if (window.location.href.startsWith("http://localhost")) {
      this.updateEvents(51.72, 1.14);
    }
    this.updateEvents();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <CitySearch updateEvents={this.updateEvents} />
        {this.state.events[0] ? (
          <NumberOfEvents
            updateNumber={this.updateNumberToShow}
            numEvents={this.state.eventsToShow}
          />
        ) : (
          ""
        )}
        <EventList
          events={this.state.events.slice(0, this.state.eventsToShow)}
          numToShow={this.state.eventsToShow}
        />
      </div>
    );
  }
}

export default App;
