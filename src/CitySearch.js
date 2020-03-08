import React, { Component } from "react";
import { getSuggestions } from "./api";
import { InfoAlert } from "./Alert";

class CitySearch extends Component {
  state = {
    query: "Munich",
    suggestions: []
  };

  handleInputChanged = event => {
    const value = event.target.value;
    getSuggestions(value).then(suggestions => this.setState({ suggestions }));
    this.setState({ query: value });

    //If value is something e.g. we're typing and the suggestions is zero
    if (value.length > 1 && this.state.suggestions.length === 0) {
      this.setState({
        infoText:
          "We cannot find the city you are looking for. Please try another"
      });
    } else {
      this.setState({ infoText: "" });
    }
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
        <InfoAlert text={this.state.infoText} />
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
