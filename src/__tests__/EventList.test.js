import React from "react";
import { shallow } from "enzyme";
import EventList from "../EventList";
import Event from "../Event";

describe("<EventList /> component", () => {
  test("render correct number of events", () => {
    const EventListWrapper = shallow(<EventList />);
    //Create some mock data when we set the state
    EventListWrapper.setState({
      events: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    });
    //Check our event state has 4 items
    expect(EventListWrapper.find(Event)).toHaveLength(4);
  });
});
