import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { mockEvents } from "../mock-events";

describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  //First test
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
  // test("render NumberOfEvents", () => {
  //   expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  // });
});

describe("<App /> integration", () => {
  test("get list of events after a user selects a city", async () => {
    //First is a wrapper using mount
    //Using mount gives us access to all of Apps children too and their functions
    const AppWrapper = mount(<App />);
    //To test a function we must mock it
    //This means we tell Jest to execute the function on the component
    //This is handled by jest.fn which is set to the update events function
    //This is just an empty jest fn because we dont need to check it returns anything
    AppWrapper.instance().updateEvents = jest.fn();
    //After mocking up updateEvents we have to update the app component
    AppWrapper.instance().forceUpdate();
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    //We say value it can be anything but must be something because handleItemClicked needs an input
    //We also add a latitude and longitude. These dont matter but our function will need them
    CitySearchWrapper.instance().handleItemClicked("value", 1.1, 1.2);
    //Our matcher is to check that the function updateEvents has been called once
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith(1.1, 1.2);
    AppWrapper.unmount();
  });
  test("change state after get list of events", async () => {
    const AppWrapper = shallow(<App />);
    AppWrapper.instance().updateEvents(1.1, 1.2);
    await AppWrapper.update();
    expect(AppWrapper.state("events")).toEqual(mockEvents.events);
  });
  test("render correct list of events", () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({
      events: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    });
    expect(AppWrapper.find(".Event")).toHaveLength(4);
    AppWrapper.unmount();
  });
  // test("checking numberOfEvents receives props with default of 5", () => {
  //   const AppWrapper = mount(<App />);
  //   const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
  //   expect(NumberOfEventsWrapper.props("numEvents")).toBe(10);
  //   AppWrapper.unmount();
  // });
});
