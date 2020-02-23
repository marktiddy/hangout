import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  test("check something rendered", () => {
    expect(NumberOfEventsWrapper.find(".numberComponent")).toHaveLength(1);
  });
  test("Check a text box has been rendered", () => {
    expect(NumberOfEventsWrapper.find(".updateNumberOfEvents")).toHaveLength(1);
  });
  test("check our props has a default of 32 events", () => {
    expect(NumberOfEventsWrapper.state("eventsToShow")).toBe(32);
  });
  test("change state when text input changes", () => {
    const eventObject = { target: { value: 64 } };
    NumberOfEventsWrapper.find(".updateNumberOfEvents").simulate(
      "change",
      eventObject
    );
    expect(NumberOfEventsWrapper.state("eventsToShow")).toBe(64);
  });
});

//The feature should
//Specify a number of events - should be 32 by default when they load the page
//User can change the number of events they want to see - the list sould expand or contact
