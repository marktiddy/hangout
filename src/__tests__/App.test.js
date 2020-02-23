import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";

describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  //Fist test
  //First we describe the test and then we declare some code
  //First we render the component using shallow as the parameter so we dont have to use the whole DOM
  //Then we say we expect the new component to find the EventList component and checks it has a length of 1
  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
  //This is simpy to check the component is there
  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
  test("render NumberOfEvents", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});
