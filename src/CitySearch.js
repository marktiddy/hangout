import React, { Component } from "react";
import { getSuggestions } from "./api";

class CitySearch extends Component {
  state = {
    query: "Munich",
    suggestions: []
  };

  handleInputChanged = event => {
    const value = event.target.value;
    getSuggestions(value).then(suggestions => this.setState({ suggestions }));
    this.setState({ query: value });
  };

  handleItemClicked = (value, lat, lon) => {
    this.setState({ query: value, suggestions: [] });
    this.props.updateEvents(lat, lon);
  };

  emptyQuery = () => {
    let n = "";
    this.setState({ query: n });
  };

  render() {
    return (
      <div className="CitySearch">
        <p>Search for a Place: </p>
        <input
          type="text"
          className="city"
          onChange={this.handleInputChanged}
          value={this.state.query}
          onClick={this.emptyQuery}
        />
        <ul className="suggestions">
          {this.state.suggestions.map(item => (
            <li
              key={item.name_string}
              onClick={() =>
                this.handleItemClicked(item.name_string, item.lat, item.lon)
              }
            >
              {item.name_string}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CitySearch;
