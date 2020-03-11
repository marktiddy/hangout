import React from "react";
import { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents } from "./api";
import Header from "./Header";
import moment from "moment";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

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

  countEventsOnADate = date => {
    let count = 0;
    for (let i = 0; i < this.state.events.length; i++) {
      if (this.state.events[i].local_date === date) {
        count += 1;
      }
    }
    return count;
  };

  getData = () => {
    const next7Days = []; //empty array for next 7 days
    const currentDate = moment(); //today
    for (let i = 0; i < 7; i++) {
      //Loops 7 days and add a day on and run the count function to compare our data
      currentDate.add(1, "days");
      const dateString = currentDate.format("YYYY-MM-DD");
      const count = this.countEventsOnADate(dateString);
      next7Days.push({ date: dateString, number: count });
    }
    return next7Days;
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
        <ResponsiveContainer height={400}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            className="chart"
          >
            <CartesianGrid />>
            <XAxis type="category" dataKey="date" name="Date" />
            <YAxis
              type="number"
              dataKey="number"
              name="Number of events"
              allowDecimals={false}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="tomato" />
          </ScatterChart>
        </ResponsiveContainer>
        <EventList
          events={this.state.events.slice(0, this.state.eventsToShow)}
          numToShow={this.state.eventsToShow}
        />
      </div>
    );
  }
}

export default App;
