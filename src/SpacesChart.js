import React, { Component } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

class SpacesChart extends Component {
  state = {
    data: [
      { name: "Available", value: 99 },
      { name: "Reservations", value: this.props.yes_rsvp_count }
    ],
    showChart: true
  };

  formatData = () => {
    const spaces = this.props.data.rsvp_limit;
    const filledSpaces = this.props.data.yes_rsvp_count;
    if (isNaN(spaces)) {
      this.setState({ showChart: false });
    } else {
      let someData = [
        { name: "Available Spaces", value: spaces - filledSpaces },
        { name: "Reservations", value: filledSpaces }
      ];
      this.setState({ data: someData });
    }
  };

  componentDidMount() {
    this.formatData();
  }

  render() {
    return this.state.showChart ? (
      <ResponsiveContainer height={350} className="piechart">
        <PieChart>
          <Pie
            isAnimationActive={false}
            data={this.state.data}
            cx={100}
            cy={200}
            outerRadius={50}
            fill="tomato"
            label
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    ) : (
      <p></p>
    );
  }
}

export default SpacesChart;
